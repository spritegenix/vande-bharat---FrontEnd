"use client";

import React from "react";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { $getRoot, EditorState } from "lexical";

import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import "./editor.css"; // optional for styling

// const editorConfig = {
//   namespace: "MyEditor",
//   theme: {
//     paragraph: "editor-paragraph",
//   },
//   onError(error: Error) {
//     throw error;
//   },
//   nodes: [],
// };

// export default function Editor() {
//   const onChange = (editorState: EditorState) => {
//     editorState.read(() => {
//       // You can read the contents here.
//       const json = editorState.toJSON();
//       const text = $getRoot().getTextContent();
//       console.log("Editor content (plain text):", text);
//     });
//   };

//   return (
//     <LexicalComposer initialConfig={editorConfig}>
//       <div className="editor-container relative w-full rounded-lg border-2 bg-background dark:border-gray-500">
//         <RichTextPlugin
//           contentEditable={
//             <ContentEditable
//               className="relative z-10 pl-2 outline-none"
//               aria-placeholder={"Feeling like writing something?"}
//               placeholder={
//                 <div className="absolute top-0 -z-0 px-2 text-gray-600">
//                   Feeling like writing something?
//                 </div>
//               }
//             />
//           }
//           ErrorBoundary={LexicalErrorBoundary}
//         />
//         <HistoryPlugin />
//         <AutoFocusPlugin />
//         <OnChangePlugin onChange={onChange} />
//       </div>
//     </LexicalComposer>
//   );
// }

import { useState } from "react";
import Image from "next/image";

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

export default function EditorWithImage() {
  const [images, setImages] = useState<File[]>([]);
  const [textContent, setTextContent] = useState("");

  const handleTextChange = (editorState: EditorState) => {
    editorState.read(() => {
      const text = $getRoot().getTextContent();
      setTextContent(text);
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages((prev) => [...prev, ...files]);
  };

  const handlePost = () => {
    console.log("Text:", textContent);
    console.log("Images:", images);
  };

  return (
    <div className="mx-auto w-full max-w-xl space-y-2 rounded-lg border bg-white p-4 shadow-lg dark:bg-gray-950">
      <LexicalComposer initialConfig={editorConfig}>
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="min-h-[50px] w-full rounded-full border border-gray-300 bg-gray-300 px-4 py-2 outline-none dark:bg-gray-900" />
          }
          placeholder={<div className="p-2 text-gray-400">What's on your mind?</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <OnChangePlugin onChange={handleTextChange} />
      </LexicalComposer>

      {/* Image Upload Button */}
      <label className="block w-full cursor-pointer text-blue-600">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        + Add Images
      </label>

      {/* Image Preview */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {images.map((img, index) => (
            <div className="relative h-40 w-full overflow-hidden rounded border" key={index}>
              {/* Remove Button */}
              <button
                onClick={() => setImages((prev) => prev.filter((_, i) => i !== index))}
                className="absolute right-1 top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-black bg-opacity-60 text-xs text-white hover:bg-red-600"
                title="Remove Image"
              >
                ×
              </button>

              <Image
                src={URL.createObjectURL(img)}
                alt={`preview-${index}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
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
