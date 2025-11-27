"use client";

import React, { useEffect } from "react";
import { Image as LucideImage, LucideVideo, X } from "lucide-react";
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
import { CreatePostPayload } from "@/types/post";
import { useAuthAxios } from "@/lib/axios";
import { Button } from "./ui/button";

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

export default function EditorWithImage({
  communitySlug,
  pageSlug,
}: {
  communitySlug?: string;
  pageSlug?: string;
}) {
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
  const axios = useAuthAxios();
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
    const data = await submitPost(axios);
    if (!data || !data.content) return;

    const payload: CreatePostPayload = {
      content: data.content,
      attachments: data.attachments ?? [],
      tags: data.tags,
      pageSlug: pageSlug ?? null,
      communitySlug: communitySlug ?? null,
      isHidden: data.isHidden ?? false,
    };

    if (payload) {
      await createPost(payload); // ← Await this!
      setShouldClearEditor(true); // ← or clearEditorState();
    }
  };

  return (
    <div className="mx-auto w-full max-w-xl rounded-xl bg-white p-4 shadow-sm dark:bg-neutral-800">
      <LexicalComposer initialConfig={editorConfig}>
        <div className="relative mb-4">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="min-h-[120px] w-full resize-none rounded-sm border border-gray-200 bg-transparent px-2 py-2 text-lg outline-none dark:border-gray-700 dark:bg-neutral-800 dark:text-white" />
            }
            placeholder={
              <div className="pointer-events-none absolute left-2 top-2 select-none text-lg text-gray-400">
                What's on your mind?
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <OnChangePlugin onChange={handleTextChange} />
          <ClearEditorPlugin
            shouldClear={shouldClearEditor}
            onCleared={() => setShouldClearEditor(false)}
          />
        </div>
      </LexicalComposer>

      {draftFiles.length > 0 && (
        <div className="mb-4 grid grid-cols-2 gap-2">
          {draftFiles.map((file, index) => (
            <div
              key={index}
              className="relative aspect-video w-full overflow-hidden rounded-lg border dark:border-gray-700"
            >
              <button
                onClick={() => removeDraftFile(index)}
                className="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white hover:bg-red-600"
              >
                <X size={14} />
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

      <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-700">
        <span className="font-medium text-gray-900 dark:text-gray-100">Add to your post</span>
        <div className="flex items-center gap-2">
          <label className="cursor-pointer rounded-full p-2 text-green-500 hover:bg-gray-100 dark:hover:bg-gray-700">
            <input
              type="file"
              multiple
              accept=".jpg,.jpeg,.webp,.mp4"
              onChange={handleMediaUpload}
              className="hidden"
            />
            <span className="flex items-center gap-2">
              {" "}
              <LucideImage size={24} className="text-green-300" />
              <LucideVideo size={24} className="text-blue-500" />
            </span>
          </label>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Button
          disabled={uploading}
          onClick={handlePost}
          className="w-fit rounded-lg py-2 font-semibold text-white disabled:opacity-50"
        >
          {uploading ? "Posting..." : "Post"}
        </Button>
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
