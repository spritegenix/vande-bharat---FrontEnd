import {create} from 'zustand';

interface Comment {
    open?: string;
    commentId:string;
    setOpen: (open?: string) => void;
    setCommentId: (commentId: string) => void;
}

export const useCommentStore = create<Comment>((set) => ({
    open: undefined,
    commentId: "",
    setOpen: (postId) => set({ open: postId }),
    setCommentId: (commentId) => set({ commentId})
}));