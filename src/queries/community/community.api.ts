
import { communityPost } from "@/types/community";
import  { AxiosInstance } from "axios";
//POST 
export const createCommuntiy = async(payload:communityPost, axios:AxiosInstance)=> {
    const response = await axios.post("/communities/create-community",payload, {withCredentials:true})
    return response.data;
}


export const fetchCommunityPosts = async(axios:AxiosInstance,{pageParam = null , slug}:{ pageParam:string | null; slug:string})=> {
    const response = await axios.get(`/communities/${slug}/allPosts`, {
        params:{
            cursor:pageParam,
        limit:3
        }
    })
    console.log(response.data.data)
    return response.data.data
}


