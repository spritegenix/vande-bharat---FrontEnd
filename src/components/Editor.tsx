"use client";

import React, { useEffect, useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { $getRoot, EditorState } from "lexical";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import "./editor.css";
import Image from "next/image";
import { useEditorStore } from "@/stores/editorStore";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const editorConfig = {
  namespace: "FacebookStyleEditor",
  theme: {
    paragraph: "editor-paragraph",
  },
  onError(error: Error) {
    console.error("Lexical Error:", error);
  },
  nodes: [],
};

const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // 1MB
const MAX_VIDEO_SIZE = 10 * 1024 * 1024; // 10MB

export default function EditorWithImage() {
  const { addPost } = useEditorStore();
  const [draftText, setDraftText] = useState("");
  const [shouldClearEditor, setShouldClearEditor] = useState(false);

  const [draftImages, setDraftImages] = useState<File[]>([]);
  const [draftVideos, setDraftVideos] = useState<File[]>([]);

  const handleTextChange = (editorState: EditorState) => {
    editorState.read(() => {
      const text = $getRoot().getTextContent();
      setDraftText(text);
    });
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validImages: File[] = [];
    const validVideos: File[] = [];

    for (const file of files) {
      const type = file.type;
      const size = file.size;

      if ((type === "image/jpeg" || type === "image/webp") && size <= MAX_IMAGE_SIZE) {
        validImages.push(file);
      } else if (type === "video/mp4" && size <= MAX_VIDEO_SIZE) {
        validVideos.push(file);
      }
    }

    if (validImages.length + validVideos.length !== files.length) {
      alert("Some files were skipped: JPG/WEBP ≤1MB, MP4 ≤10MB only.");
    }

    setDraftImages((prev) => [...prev, ...validImages]);
    setDraftVideos((prev) => [...prev, ...validVideos]);
  };

  const removeDraftImage = (index: number) => {
    setDraftImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeDraftVideo = (index: number) => {
    setDraftVideos((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePost = () => {
    if (!draftText.trim() && draftImages.length === 0 && draftVideos.length === 0) return;
    addPost(draftText, draftImages, draftVideos);
    setDraftText("");
    setDraftImages([]);
    setDraftVideos([]);
    setShouldClearEditor(true);
  };

  return (
    <div className="mx-auto w-full max-w-xl space-y-2 rounded-lg">
      <LexicalComposer initialConfig={editorConfig}>
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="min-h-[80px] w-full rounded-xl border border-gray-300 bg-gray-300 px-4 py-2 outline-none dark:bg-gray-900" />
          }
          placeholder={<div className="p-2 text-gray-400">What's on your mind?</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <OnChangePlugin onChange={handleTextChange} />
        <ClearEditorPlugin
          shouldClear={shouldClearEditor}
          onCleared={() => setShouldClearEditor(false)}
        />
      </LexicalComposer>

      {/* File Upload */}
      <label className="block w-full cursor-pointer text-blue-600">
        <input
          type="file"
          multiple
          accept=".jpg,.jpeg,.webp,.mp4"
          onChange={(e) => {
            handleMediaUpload(e);
            e.target.value = ""; // reset input
          }}
          className="hidden"
        />
        + Add Images/Videos
      </label>

      {/* Preview Media */}
      {(draftImages.length > 0 || draftVideos.length > 0) && (
        <div className="grid grid-cols-2 gap-4">
          {draftImages.map((file, index) => (
            <div
              key={`img-${index}`}
              className="relative h-40 w-full overflow-hidden rounded border"
            >
              <button
                onClick={() => removeDraftImage(index)}
                className="absolute right-1 top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-black bg-opacity-60 text-xs text-white hover:bg-red-600"
                title="Remove Image"
              >
                ×
              </button>
              <Image
                src={URL.createObjectURL(file)}
                alt={`preview-${index}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
          {draftVideos.map((file, index) => (
            <div
              key={`vid-${index}`}
              className="relative h-40 w-full overflow-hidden rounded border"
            >
              <button
                onClick={() => removeDraftVideo(index)}
                className="absolute right-1 top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-black bg-opacity-60 text-xs text-white hover:bg-red-600"
                title="Remove Video"
              >
                ×
              </button>
              <video
                src={URL.createObjectURL(file)}
                controls
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Post Button */}
      <div className="flex justify-end">
        <button
          onClick={handlePost}
          className="w-fit rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Post
        </button>
      </div>
    </div>
  );
}

interface ClearEditorPluginProps {
  shouldClear: boolean;
  onCleared: () => void;
}

function ClearEditorPlugin({ shouldClear, onCleared }: ClearEditorPluginProps) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (shouldClear) {
      editor.update(() => {
        const root = $getRoot();
        root.clear();
      });
      onCleared();
    }
  }, [shouldClear, editor, onCleared]);

  return null;
}
