import { useState } from "react";
import { Input } from "../Input";
import { IoAddCircleOutline } from "react-icons/io5";
import { error } from "console";
import { div } from "framer-motion/m";
import Button from "../Button";

interface MultiInputProps {
  inputArray: string[];
  setInputArray: (inputArray: string[]) => void;
  label: string;
  leftIcon?: React.ReactNode;
  errors?: Record<string, any>;
  [key: string]: any;
}

export default function MultiInputWithStringInput({
  inputArray = [],
  setInputArray,
  label,
  leftIcon,
  errors,
  ...props
}: MultiInputProps) {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!inputArray.includes(inputValue.trim())) {
        setInputArray([...inputArray, inputValue.trim()]);
        setInputValue("");
      }
    }
  };
  const handleAdd = () => {
    if (inputValue.trim()) {
      if (!inputArray.includes(inputValue.trim())) {
        setInputArray([...inputArray, inputValue.trim()]);
        setInputValue("");
      }
    }
  };

  const handleRemoveTag = (tag: string) => {
    setInputArray(inputArray.filter((t) => t !== tag));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <Input
          type="text"
          label={label}
          placeholder=" "
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          {...props}
        />
        <Button as={"div"} className="mt-5" onClick={handleAdd}>
          Add
        </Button>
      </div>
      <div className="space-y-2">
        {inputArray?.map((tag, index) => (
          <div key={tag} className="flex flex-wrap items-center gap-3">
            <div className="group flex w-max flex-wrap items-center gap-2 rounded-md bg-zinc-100 px-3 py-1 font-medium text-zinc-700">
              <span className="transition-all duration-300 group-hover:scale-110">{leftIcon}</span>
              <span>{tag}</span>
              <div
                onClick={() => handleRemoveTag(tag)}
                className="cursor-pointer text-xl text-red-500 transition-all duration-300 hover:scale-125 active:scale-95"
              >
                &times;
              </div>
            </div>
            {errors?.[index]?.message && (
              <p className="text-xs text-red-500">{errors?.[index].message}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
