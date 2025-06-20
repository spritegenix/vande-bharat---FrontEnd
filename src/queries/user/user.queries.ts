import { useQuery } from '@tanstack/react-query';
import { allSentRequests, fetchCurrentUser, fetchSuggestions } from './user.api';

export const useCurrentUser = (queryParams?: Record<string, any>) =>
  useQuery({
    queryKey: ['current-user', queryParams], 
    queryFn: () => fetchCurrentUser(queryParams),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  export const useSuggestions = ()=> useQuery({
    queryKey:["friend-suggestions"],
    queryFn: ()=> fetchSuggestions(),
    staleTime: 1000 * 60 * 2,
    retry:1,
  })


  export const useAllsentRequest = ()=> useQuery({
    queryKey:["allSent-requests"],
    queryFn:()=> allSentRequests(),
    staleTime: 1000 * 60 * 5,
    retry:1
  })

 