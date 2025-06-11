import axios from "@/lib/axios";
import { communityPost } from "@/types/community";

//POST 
export const createCommuntiy = async(payload:communityPost)=> {
    const response = await axios.post("/communities/create-community",payload, {withCredentials:true})
    return response.data;
}


