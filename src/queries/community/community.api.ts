import { CommunityFormValues } from "@/app/(Main)/community/create/page";
import { CommunityDiscussionType, communityPost, updateCommunityInfoType } from "@/types/community";
import axios, { AxiosInstance } from "axios";

//POST
export const createCommuntiy = async (payload: CommunityFormValues, axios: AxiosInstance) => {
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

export const getDiscussions = async (
  axios: AxiosInstance,
  { communitySlug, pageParam }: { communitySlug: string; pageParam: string | null },
) => {
  const response = await axios.get(`/communities/${communitySlug}/discussions`, {
    params: {
      cursor: pageParam,
      limit: 10,
    },
  });
  return response.data.data;
};

export const getReplies = async (
  axios: AxiosInstance,
  { discussionSlug }: { discussionSlug: string },
) => {
  const response = await axios.get(`/communities/discussions/${discussionSlug}/replies`);
  return response.data.data;
};

export const fetchCommunityMembers = async (
  axios: AxiosInstance,
  { communitySlug, pageParam }: { communitySlug: string; pageParam: string | null },
) => {
  const response = await axios.get(`/communities/${communitySlug}/members`, {
    params: {
      cursor: pageParam,
      limit: 10,
    },
  });

  return response.data;
};

export const updateCommunityInfo = async (
  axios: AxiosInstance,
  { communitySlug, payload }: { communitySlug: string; payload: updateCommunityInfoType },
) => {
  const response = await axios.patch(`/communities/${communitySlug}/update`, payload);
  return response.data;
};

export const getCommunityInfo = async (axios: AxiosInstance, communitySlug: string) => {
  const response = await axios.get(`/communities/${communitySlug}/single`, {
    params: {
      fields: "description,tags,banner,category,location,rules",
    },
  });
  return response.data.data;
};

export const joinCommunity = async (axios: AxiosInstance, communitySlug: string) => {
  const response = await axios.patch(`/communities/${communitySlug}/single/join`);
  return response.data;
};

export const leaveCommunity = async (axios: AxiosInstance, communitySlug: string) => {
  const response = await axios.patch(`/communities/${communitySlug}/leave`);
  return response.data;
};

export const deleteCommunity = async (axios: AxiosInstance, communitySlug: string) => {
  const response = await axios.patch(`/communities/${communitySlug}/delete`);
  return response.data;
};

export const toggleAdmin = async (
  axios: AxiosInstance,
  { communitySlug, memberId }: { communitySlug: string; memberId: string },
) => {
  const response = await axios.patch(`/communities/${communitySlug}/toggle-member-promotion`, {
    memberId,
  });
  return response.data;
};
export const removeMember = async (
  axios: AxiosInstance,
  { communitySlug, memberId }: { communitySlug: string; memberId: string },
) => {
  const response = await axios.patch(`/communities/${communitySlug}/member/remove`, {
    memberId,
  });
  return response.data;
};

export const joinPrivateCommunity = async (
  axios: AxiosInstance,
  { communitySlug }: { communitySlug: string },
) => {
  const response = await axios.post(`/requests/join-community/${communitySlug}`);
  return response.data;
};

export const getJoinRequests = async (axios: AxiosInstance, communitySlug: string) => {
  const response = await axios.get(`/requests/join-community/${communitySlug}/requests`);
  return response.data.data;
};

export const respondToJoinRequest = async (
  axios: AxiosInstance,
  {
    communitySlug,
    fromUserId,
    action,
  }: { communitySlug: string; fromUserId: string; action: "ACCEPTED" | "REJECTED" },
) => {
  const response = await axios.patch(`/requests/join-community/${communitySlug}/respond`, {
    requestId: fromUserId,
    action,
  });
  return response.data;
};
