import React from "react";
import { FaRegClock } from "react-icons/fa";

interface TimePickerProps {
  id?: string;
  min?: string; // Minimum time, e.g., "09:00"
  max?: string; // Maximum time, e.g., "18:00"
  defaultValue?: string; // Default time value
  value?: string; // Controlled value for the input
  onChange?: (value: string) => void; // Change handler to notify parent
  className?: string; // Additional CSS classes for styling
}

const TimePicker: React.FC<TimePickerProps> = ({
  id = "time",
  min = "00:00",
  max = "23:59",
  defaultValue = "",
  value,
  onChange,
  className = "",
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <form className={`${className}`}>
        <input
          type="time"
          id={id}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm leading-none text-gray-900"
          min={min}
          max={max}
          defaultValue={defaultValue}
          value={value}
          onChange={handleChange}
          required
        />
    </form>
  );
};

export default TimePicker;
