import { cookies } from 'next/headers';

const TOKEN_KEY = 'auth_token';

export const getToken = async() => {
  return (await cookies()).get(TOKEN_KEY)?.value || null;
};

export const setToken = async(token: string) => {
 (await cookies()).set(TOKEN_KEY, token, { httpOnly: true, secure: true });
};

export const removeToken = async() => {
  (await cookies()).delete(TOKEN_KEY);
};
