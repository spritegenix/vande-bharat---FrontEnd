import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  allFollowRequests,
  allSentRequests,
  fetchCurrentUser,
  fetchSuggestions,
  fetchUserById,
  followingUsers,
  myCommunities,
  Usersfollowers
} from './user.api';
import { useAuthAxios } from '@/lib/axios';

export const useCurrentUser = (queryParams?: Record<string, any>) => {
  const axios = useAuthAxios();
  return useQuery({
    queryKey: ['current-user', queryParams],
    queryFn: () => fetchCurrentUser(axios, queryParams),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus:false
  });
};

export const useUserById = (slug?: string) => {
  const axios = useAuthAxios();
  return useQuery({
    queryKey: ['user-by-id', slug],
    queryFn: () => fetchUserById(axios, slug),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export const useSuggestions = () => {
  const axios = useAuthAxios();
  return useInfiniteQuery({
    queryKey: ['friend-suggestions'],
    queryFn: ({ pageParam }) => fetchSuggestions(axios, pageParam),
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? null,
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });
};

export const useAllsentRequest = () => {
  const axios = useAuthAxios();
  return useInfiniteQuery({
    queryKey: ['allSent-requests'],
    queryFn: ({ pageParam }) => allSentRequests(axios, pageParam),
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? null,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export const useFollowRequests = () => {
  const axios = useAuthAxios();
  return useInfiniteQuery({
    queryKey: ['recieved-requests'],
    queryFn: ({ pageParam }) => allFollowRequests(axios, pageParam),
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? null,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export const useFollowingUsers = (slug?: string) => {
  const axios = useAuthAxios();
  return useInfiniteQuery({
    queryKey: ['following-Users', slug],
    queryFn: ({ pageParam }) => followingUsers(axios, slug!, pageParam),
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? null,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export const useFollowerUsers = (slug?: string) => {
  const axios = useAuthAxios();
  return useInfiniteQuery({
    queryKey: ['follower-Users', slug],
    queryFn: ({ pageParam }) => Usersfollowers(axios, slug!, pageParam),
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? null,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};


export const useMyCommunities = (slug?: string) => {
  const axios = useAuthAxios();
  return useInfiniteQuery({
    queryKey: ['my-communities'],
    queryFn:({pageParam})=> myCommunities(axios, pageParam, slug!),
    initialPageParam:null,
    getNextPageParam:(lastPage)=> lastPage?.nextCursor ?? null,
    staleTime: 1000 * 60* 5,
    retry: 1,
  })
}