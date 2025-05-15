import {create} from "zustand"


interface AboutStore {
    description:string,
    addDescription:(text:string)=>void,
    deletedDescription:()=>void
}
export const useAboutStore = create<AboutStore>((set)=> ({
    description:"",
    addDescription:(text)=> set(state=> ({description:text})),
    deletedDescription:()=>set(()=> ({description: ""}))
}))