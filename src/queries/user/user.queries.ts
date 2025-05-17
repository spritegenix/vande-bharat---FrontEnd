import { useQuery } from '@tanstack/react-query';
import { fetchCurrentUser } from './user.api';

export const useCurrentUser = () =>
  useQuery({
    queryKey: ['current-user'],
    queryFn: fetchCurrentUser,
    staleTime: 1000 * 60 * 5, // 5 mins
    retry: 1,
  });
