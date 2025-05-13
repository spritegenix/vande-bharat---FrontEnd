import { create } from "zustand";

interface Post {
  id: string;
  textContent: string;
  images: File[]; // Only image files
  videos: File[]; // Only video files
  createdAt: Date;
}

interface EditorStore {
  posts: Post[];
  addPost: (text: string, images: File[], videos: File[]) => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
  posts: [],
  addPost: (text, images, videos) =>
    set((state) => ({
      posts: [
        {
          id: crypto.randomUUID(),
          textContent: text,
          images,
          videos,
          createdAt: new Date(),
        },
        ...state.posts,
      ],
    })),
}));
