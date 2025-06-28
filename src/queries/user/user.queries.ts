import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { allFollowRequests, allSentRequests, fetchCurrentUser, fetchSuggestions, fetchUserById, followingUsers, Usersfollowers } from './user.api';

export const useCurrentUser = (queryParams?: Record<string, any>) =>
  useQuery({
    queryKey: ['current-user', queryParams], 
    queryFn: () => fetchCurrentUser(queryParams),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  export const useUserById = (slug?: string) =>
  useQuery({
    queryKey: ['user-by-id', slug],
    queryFn: () => fetchUserById(slug),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

export const useSuggestions = () =>
  useInfiniteQuery({
    queryKey: ["friend-suggestions"],
    queryFn: ({ pageParam }) => fetchSuggestions(pageParam),
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? null,
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });


  export const useAllsentRequest = ()=> useInfiniteQuery({
    queryKey:["allSent-requests"],
    queryFn:({pageParam})=> allSentRequests(pageParam),
    initialPageParam:"",
    getNextPageParam:(lastpage) => lastpage?.nextCursor ?? null,
    staleTime: 1000 * 60 * 5,
    retry:1
  })

  export const useFollowRequests = () => 
   useInfiniteQuery({
    queryKey: ['recieved-requests'],
    queryFn: ({pageParam}) => allFollowRequests(pageParam),
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? null,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });


  export const useFollowingUsers = (slug?: string)=> useInfiniteQuery({
    queryKey:["following-Users"],
    queryFn:({pageParam})=> followingUsers(pageParam, slug),
    initialPageParam:"",
    getNextPageParam:(lastPage)=> lastPage?.nextCursor ?? null,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  })
 
    export const useFollowerUsers = (slug?: string)=> useInfiniteQuery({
    queryKey:["follower-Users"],
    queryFn:({pageParam})=> Usersfollowers(pageParam, slug),
    initialPageParam:"",
    getNextPageParam:(lastPage)=> lastPage?.nextCursor ?? null,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  })