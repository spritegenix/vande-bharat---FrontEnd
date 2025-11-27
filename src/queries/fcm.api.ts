import { AxiosInstance } from "axios";

interface FcmTokenPayload {
  token: string;
  deviceInfo: {
    os: string;
    browser: string;
    version: string;
  };
}

export const saveFcmToken = async (
  axios: AxiosInstance,
  payload: FcmTokenPayload,
): Promise<any> => {
  const response = await axios.post("/fcm/token", payload);
  return response.data;
};

export const removeFcmToken = async (axios: AxiosInstance, token: string): Promise<any> => {
  const response = await axios.delete("/fcm/token", { data: { token } });
  return response.data;
};
