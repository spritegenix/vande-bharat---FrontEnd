import { useUpdateProfile } from "@/queries/user/user.mutation"
import { useUserById } from "@/queries/user/user.queries"
import {create} from "zustand"


interface AboutStore {
    description:string,
    addDescription:(text:string)=>void,
    deletedDescription:()=>void
}
// const {mutate: bioUpdate} = useUpdateProfile()
// const {data: userData, isLoading} = useUserById()

export const useAboutStore = create<AboutStore>((set)=> ({
    description: "",
    addDescription:(text)=> set(state=> ({description: text})),
    deletedDescription:()=>set(()=> ({description: ""}))
}))