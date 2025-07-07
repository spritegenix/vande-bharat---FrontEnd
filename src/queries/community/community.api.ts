
import { communityPost } from "@/types/community";
import { AxiosInstance } from "axios";
//POST 
export const createCommuntiy = async(payload:communityPost, axios:AxiosInstance)=> {
    const response = await axios.post("/communities/create-community",payload, {withCredentials:true})
    return response.data;
}


