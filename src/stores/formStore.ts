import {create} from "zustand"
interface FormFields{
    label:string,
    type: "text" | "textarea"| "date" | "number"
    value: string
}

interface FormStoreState {
    formFields: FormFields[],
    addField:(field:FormFields)=>void,
    removeField:(index:number)=>void,
    updateField:(index:number, updateField:FormFields)=>void,
    resetForm:()=> void
}

const useFormStore = create<FormStoreState>((set)=>({
    formFields:[],
    addField:(field)=> set(state=>({formFields:[...state.formFields, field]})),
    removeField:(index)=> set(state=> ({ formFields:state.formFields.filter((_,i)=> i !== index)})),
    updateField:(index, updateField)=> set(state=>({
        formFields:state.formFields.map((field,i)=> i === index ? updateField : field)
    })),
    resetForm:()=>set({formFields:[]})

}))
export default useFormStore