
import axios from '@/lib/axios';

export const fetchCurrentUser  = async () => {
  const res = await axios.get('/api/v1/users/me', { withCredentials: true });
  return res.data;

};


