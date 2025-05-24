"use client";

import React, { useEffect } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { $getRoot, EditorState } from "lexical";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import "./editor.css";
import Image from "next/image";
import { useEditorStore } from "@/stores/editorStore";
import { useCreatePost } from "@/queries/posts/posts.mutation";

const editorConfig = {
  namespace: "FacebookStyleEditor",
  theme: { paragraph: "editor-paragraph" },
  onError(error: Error) {
    console.error("Lexical Error:", error);
  },
  nodes: [],
};

const MAX_IMAGE_SIZE = 1 * 1024 * 1024;
const MAX_VIDEO_SIZE = 10 * 1024 * 1024;

export default function EditorWithImage() {
  const {
    draftFiles,
    setDraftText,
    setDraftFiles,
    removeDraftFile,
    submitPost,
    uploading,
    clearEditorState,
  } = useEditorStore();
  const [shouldClearEditor, setShouldClearEditor] = React.useState(false);
  const { mutateAsync: createPost } = useCreatePost();

  const handleTextChange = (editorState: EditorState) => {
    editorState.read(() => {
      const text = $getRoot().getTextContent();
      setDraftText(text);
    });
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter((file) => {
      const { type, size } = file;
      return (
        (["image/jpeg", "image/webp", "image/png"].includes(type) && size <= MAX_IMAGE_SIZE) ||
        (type === "video/mp4" && size <= MAX_VIDEO_SIZE)
      );
    });

    if (validFiles.length !== files.length) {
      alert("Some files were skipped: JPG,PNG/WEBP ≤1MB, MP4 ≤10MB only.");
    }

    setDraftFiles([...draftFiles, ...validFiles]);
    e.target.value = "";
  };

  const handlePost = async () => {
    const payload = await submitPost();
    if (payload) {
      await createPost(payload); // ← Await this!
      setShouldClearEditor(true); // ← or clearEditorState();
    }
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

      <label className="block w-full cursor-pointer text-blue-600">
        <input
          type="file"
          multiple
          accept=".jpg,.jpeg,.webp,.mp4"
          onChange={handleMediaUpload}
          className="hidden"
        />
        + Add Images/Videos
      </label>

      {draftFiles.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {draftFiles.map((file, index) => (
            <div key={index} className="relative h-40 w-full overflow-hidden rounded border">
              <button
                onClick={() => removeDraftFile(index)}
                className="absolute right-1 top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-black bg-opacity-60 text-xs text-white hover:bg-red-600"
              >
                ×
              </button>
              {file.type.startsWith("video/") ? (
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

      <div className="flex justify-end">
        <button
          disabled={uploading}
          onClick={handlePost}
          className="w-fit rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          {uploading ? "Posting..." : "Post"}
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
