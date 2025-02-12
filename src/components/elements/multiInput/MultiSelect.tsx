import { useState } from "react";
import Button from "../Button";

interface Option {
  id: string;
  name: string;
}
interface MultiSelectProps {
  options: Option[];
  selectedOptions: Option[];
  setSelectedOptions: (selectedOptions: Option[]) => void;
  leftIcon?: React.ReactNode;
  errors?: Record<string, any>;
  [key: string]: any;
}

export default function MultiSelect({
  options,
  selectedOptions = [],
  setSelectedOptions,
  leftIcon,
  errors,
  ...props
}: MultiSelectProps) {
  const [selectedValue, setSelectedValue] = useState<Option | undefined>();

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selectedOption = options.find((option) => option.id === selectedId);
    setSelectedValue(selectedOption);
  };

  const handleAddOption = () => {
    if (selectedValue && !selectedOptions.some((option) => option.id === selectedValue.id)) {
      setSelectedOptions([...selectedOptions, selectedValue]);
      setSelectedValue(undefined); // Clear selection
    }
  };

  const handleRemoveOption = (option: Option) => {
    setSelectedOptions(selectedOptions.filter((item) => item.id !== option.id));
  };

  return (
    <div className="space-y-2">
      <div className="flex w-full items-center gap-3">
        <div className="flex w-full flex-col">
          <select
            value={selectedValue?.id || ""}
            onChange={handleSelectChange}
            className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm capitalize text-zinc-500 outline-none duration-200 focus:outline-bg1"
            {...props}
          >
            <option value="" disabled>
              Select an option
            </option>
            {options
              .filter((option) => !selectedOptions.some((selected) => selected?.id === option?.id))
              .map((option: Option) => (
                <option key={option?.id} value={option?.id}>
                  {option?.name}
                </option>
              ))}
          </select>
        </div>
        <Button as={"div"} className="cursor-pointer" onClick={handleAddOption}>
          Add
        </Button>
      </div>

      <div className="flex flex-wrap gap-3">
        {selectedOptions.map((option, index) => (
          <div key={option?.id} className="flex flex-wrap items-center gap-3">
            <div className="group flex w-max flex-wrap items-center gap-2 rounded-md bg-zinc-100 px-3 py-1 font-medium text-zinc-700">
              <span className="transition-all duration-300 group-hover:scale-110">{leftIcon}</span>
              <span>{option.name}</span>
              <div
                onClick={() => handleRemoveOption(option)}
                className="cursor-pointer text-xl text-red-500 transition-all duration-300 hover:scale-125 active:scale-95"
              >
                &times;
              </div>
            </div>
            {errors?.[index]?.message && (
              <p className="text-xs text-red-500">{errors[index].message}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
