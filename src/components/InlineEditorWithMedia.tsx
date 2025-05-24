"use client";
import React, { useEffect, useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot, $createParagraphNode, $createTextNode } from "lexical";
import Image from "next/image";
import { Button } from "./ui/button";

const MAX_IMAGE_SIZE = 1 * 1024 * 1024;
const MAX_VIDEO_SIZE = 10 * 1024 * 1024;

interface InlineEditorWithMediaProps {
  initialText: string;
  initialFiles: File[] | any[]; // S3 links or local
  onSave: (text: string, newFiles: File[], remainingExisting: any[]) => void;
  onCancel: () => void;
}

const editorConfig = {
  namespace: "InlineEditor",
  theme: { paragraph: "editor-paragraph" },
  onError: (error: Error) => console.error("Lexical Error", error),
};

export default function InlineEditorWithMedia({
  initialText,
  initialFiles,
  onSave,
  onCancel,
}: InlineEditorWithMediaProps) {
  const [content, setContent] = useState(initialText);
  const [media, setMedia] = useState<File[]>([]);
  const [existingMedia, setExistingMedia] = useState(initialFiles); // for S3 links

  const handleChange = (editorState: any) => {
    editorState.read(() => {
      const text = $getRoot().getTextContent();
      setContent(text);
    });
  };

  const handleAddFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const valid = files.filter((file) => {
      const { type, size } = file;
      return (
        (["image/jpeg", "image/webp", "image/png"].includes(type) && size <= MAX_IMAGE_SIZE) ||
        (type === "video/mp4" && size <= MAX_VIDEO_SIZE)
      );
    });
    if (valid.length !== files.length) {
      alert("Some files were skipped: JPG/WEBP ≤1MB, MP4 ≤10MB only.");
    }
    setMedia((prev) => [...prev, ...valid]);
    e.target.value = "";
  };

  const removeMedia = (index: number, isNew: boolean) => {
    if (isNew) {
      setMedia((prev) => prev.filter((_, i) => i !== index));
    } else {
      setExistingMedia((prev) => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="mx-4 my-3 space-y-2 py-2">
      <LexicalComposer initialConfig={editorConfig}>
        <InitialContentPlugin initialText={initialText} />
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="min-h-[60px] w-full rounded border border-gray-300 bg-gray-300 px-3 py-2 outline-none dark:bg-gray-800" />
          }
          placeholder={null}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <OnChangePlugin onChange={handleChange} />
      </LexicalComposer>

      {(existingMedia.length > 0 || media.length > 0) && (
        <div className="grid grid-cols-2 gap-4">
          {existingMedia.map((file, i) => (
            <div key={i} className="relative h-40 w-full overflow-hidden rounded border">
              <button
                onClick={() => removeMedia(i, false)}
                className="absolute right-1 top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-black bg-opacity-60 text-xs text-white hover:bg-red-600"
              >
                ×
              </button>
              {file.type === "VIDEO" || file.mimeType?.includes("video") ? (
                <video src={file.url} controls className="h-full w-full object-cover" />
              ) : (
                <Image src={file.url} alt="existing" fill className="object-cover" />
              )}
            </div>
          ))}

          {media.map((file, i) => (
            <div key={i} className="relative h-40 w-full overflow-hidden rounded border">
              <button
                onClick={() => removeMedia(i, true)}
                className="absolute right-1 top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-black bg-opacity-60 text-xs text-white hover:bg-red-600"
              >
                ×
              </button>
              {file.type.includes("video") ? (
                <video
                  src={URL.createObjectURL(file)}
                  controls
                  className="h-full w-full object-cover"
                />
              ) : (
                <Image
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  fill
                  className="object-cover"
                />
              )}
            </div>
          ))}
        </div>
      )}

      <label className="block w-full cursor-pointer text-blue-600">
        <input
          type="file"
          multiple
          accept=".jpg,.jpeg,.webp,.mp4"
          onChange={handleAddFiles}
          className="hidden"
        />
        + Add Images/Videos
      </label>

      <div className="flex justify-end gap-2">
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={() => onSave(content, media, existingMedia)}>Save</Button>
      </div>
    </div>
  );
}

function InitialContentPlugin({ initialText }: { initialText: string }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.update(() => {
      const root = $getRoot();
      root.clear();

      const paragraph = $createParagraphNode();
      paragraph.append($createTextNode(initialText));
      root.append(paragraph);
    });
  }, [editor, initialText]);

  return null;
}
