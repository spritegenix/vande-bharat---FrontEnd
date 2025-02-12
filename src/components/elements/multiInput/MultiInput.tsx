import { useEffect, useState } from "react";
import { Input } from "../Input";
import Button from "../Button";

export interface inputItem {
  id?: string | number | undefined;
  name?: string;
  isDelete?: boolean;
  error?: string;
}
interface MultiInputProps {
  inputValidationFunction?: (text: string) => boolean;
  inputArray: inputItem[];
  setInputArray: any;
  label: string;
  leftIcon?: React.ReactNode;
  error?: string;
  individualErrors?: string[];
  [key: string]: any;
}

export default function MultiInput({
  inputValidationFunction,
  inputArray = [],
  setInputArray,
  label,
  leftIcon,
  error,
  individualErrors,
  ...props
}: MultiInputProps) {
  // useEffect(() => {
  //   console.log(inputArray, "inputArray");
  // }, [inputArray]);
  const [inputValue, setInputValue] = useState<string>("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const trimmedValue = inputValue.trim() || "";
    if (e.key === "Enter" && trimmedValue) {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleAdd = () => {
    const trimmedValue = inputValue.trim() || "";
    if (trimmedValue) {
      const isDuplicate = inputArray.filter((item) => item?.name === trimmedValue).length > 0;
      if (!isDuplicate) {
        let inputObject = {
          id: "",
          name: trimmedValue,
          isDelete: false,
          error: inputValidationFunction && inputValidationFunction(trimmedValue) ? false : true,
        };
        setInputArray([...inputArray, inputObject]);

        setInputValue("");
      }
    }
  };

  const handleRemoveTag = async (selectedItem: inputItem) => {
    // console.log(selectedItem.id, "selectedItem");
    if (selectedItem?.id) {
      setInputArray(
        inputArray.map((item) =>
          item.id === selectedItem.id ? { ...item, isDelete: !item.isDelete } : item,
        ),
      );
    } else {
      setInputArray(inputArray.filter((item) => item?.name !== selectedItem?.name));
    }
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
        {inputArray &&
          inputArray?.length > 0 &&
          inputArray
            ?.filter((item) => !item?.isDelete)
            ?.map((item, index) => (
              <div key={item?.id || index} className="flex flex-wrap items-center gap-3">
                <div className="group flex w-max flex-wrap items-center gap-2 rounded-md bg-zinc-100 px-3 py-1 font-medium text-zinc-700">
                  <span className="transition-all duration-300 group-hover:scale-110">
                    {leftIcon}
                  </span>
                  <span>{item?.name}</span>
                  <div
                    onClick={() => handleRemoveTag(item)}
                    className="cursor-pointer text-xl text-red-500 transition-all duration-300 hover:scale-125 active:scale-95"
                  >
                    &times;
                  </div>
                </div>
                {item?.error && <p className="text-xs text-red-500">Invalid Input</p>}
              </div>
            ))}
        {error && <p className="text-xs text-red-500">{error}</p>}
        {individualErrors &&
          individualErrors?.length > 0 &&
          individualErrors?.map((error, index) => (
            <p key={index} className="text-xs text-red-500">
              {error}
            </p>
          ))}
      </div>
    </div>
  );
}
