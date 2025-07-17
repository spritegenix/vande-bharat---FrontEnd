import { CommunityDiscussionType, communityPost } from "@/types/community";
import axios, { AxiosInstance } from "axios";

//POST
export const createCommuntiy = async (payload: communityPost, axios: AxiosInstance) => {
  const response = await axios.post("/communities/create-community", payload, {
    withCredentials: true,
  });
  return response.data;
};

export const fetchCommunityPosts = async (
  axios: AxiosInstance,
  { pageParam = null, slug }: { pageParam: string | null; slug: string },
) => {
  const response = await axios.get(`/communities/${slug}/allPosts`, {
    params: {
      cursor: pageParam,
      limit: 3,
    },
  });
  return response.data.data;
};

export const createDiscussion = async (
  axios: AxiosInstance,
  { communitySlug, payload }: { communitySlug: string; payload: CommunityDiscussionType },
) => {
  const response = await axios.post(`/communities/${communitySlug}/discussions/create`, {
    title: payload.title,
    content: payload.content,
  });
  return response.data;
};


export const getDiscussions = async(axios: AxiosInstance, {communitySlug, pageParam}: {communitySlug: string, pageParam: string | null}) => {
    const response = await axios.get(`/communities/${communitySlug}/discussions`, {
        params:{
            cursor:pageParam,
            limit:3
        }
    });
    return response.data.data
}

export const getReplies = async(axios: AxiosInstance, {discussionSlug}: {discussionSlug: string}) => {
    const response = await axios.get(`/communities/discussions/${discussionSlug}/replies`);
    return response.data.data
}