import React, { useEffect } from "react";

// Types and Interfaces
interface DayItem {
  id: DayKey;
  label: string;
  disabled?: boolean;
  defaultChecked?: boolean;
}

type DayKey = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";

type TimeSlotData = {
  start?: string | undefined;
  end?: string | undefined;
  checked?: boolean | undefined;
};

type WeekTimeSlots = {
  monday: TimeSlotData;
  tuesday: TimeSlotData;
  wednesday: TimeSlotData;
  thursday: TimeSlotData;
  friday: TimeSlotData;
  saturday: TimeSlotData;
  sunday?: TimeSlotData;
};

interface WeekCheckboxProps {
  label?: string;
  timeSlots?: WeekTimeSlots;
  setTimeSlots: (timeSlots: WeekTimeSlots) => void;
  errors?: any;
}

const DEFAULT_DAYS: readonly DayItem[] = [
  { id: "monday", label: "Monday", defaultChecked: true },
  { id: "tuesday", label: "Tuesday", defaultChecked: true },
  { id: "wednesday", label: "Wednesday", defaultChecked: true },
  { id: "thursday", label: "Thursday", defaultChecked: true },
  { id: "friday", label: "Friday", defaultChecked: true },
  { id: "saturday", label: "Saturday", defaultChecked: false },
  { id: "sunday", label: "Sunday", defaultChecked: false },
] as const;

const getDefaultTimeSlots = (dayItems: readonly DayItem[]): WeekTimeSlots => {
  const slots = dayItems.reduce(
    (acc, item) => ({
      ...acc,
      [item.id]: {
        start: "",
        end: "",
        checked: item.defaultChecked ?? false,
      },
    }),
    {} as WeekTimeSlots,
  );

  return slots;
};

export default function WeekCheckbox({
  label = "Week",
  timeSlots = getDefaultTimeSlots(DEFAULT_DAYS),
  setTimeSlots,
  errors,
}: WeekCheckboxProps) {
  const handleCheckboxChange = (dayId: DayKey) => {
    const currentSlot = timeSlots[dayId];
    const updatedTimeSlots = {
      ...timeSlots,
      [dayId]: {
        ...currentSlot,
        checked: !(currentSlot?.checked ?? false),
        start: !(currentSlot?.checked ?? false) ? "" : currentSlot?.start,
        end: !(currentSlot?.checked ?? false) ? "" : currentSlot?.end,
      },
    };

    setTimeSlots(updatedTimeSlots);
  };

  const handleTimeChange = (dayId: DayKey, type: "start" | "end", value: string) => {
    const currentSlot = timeSlots[dayId];
    setTimeSlots({
      ...timeSlots,
      [dayId]: {
        ...currentSlot,
        [type]: value,
      },
    });
  };

  useEffect(() => {
    console.log("Errors:", errors);
  }, [errors]);
  return (
    <fieldset className="space-y-2">
      <legend className="mb-5 text-xl font-semibold">{label}</legend>
      <div className="flex flex-col gap-1.5">
        {DEFAULT_DAYS.map((item) => {
          const timeSlot = timeSlots[item.id];
          return (
            <div key={item.id} className="flex items-center gap-5">
              <label
                htmlFor={`checkbox-${item.id}`}
                className={`border-input relative flex size-9 cursor-pointer flex-col items-center justify-center rounded-full border text-center shadow-sm shadow-black/5 transition-colors ${
                  timeSlot?.checked ? "bg-bg1 text-white" : "bg-white text-zinc-800"
                }`}
              >
                <Checkbox
                  id={`checkbox-${item.id}`}
                  value={item.id}
                  checked={timeSlot?.checked ?? false}
                  disabled={item.disabled}
                  onChange={() => {
                    // console.log(item);
                    // console.log(timeSlot)
                    handleCheckboxChange(item.id);
                  }}
                />
                <span aria-hidden="true" className="text-sm font-medium">
                  {item.label[0]}
                </span>
                <span className="sr-only">{item.label}</span>
              </label>
              <input
                type="time"
                min="00:00"
                max="23:59"
                className="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm leading-none text-gray-900 disabled:opacity-50"
                value={timeSlot?.start ?? ""}
                disabled={!timeSlot?.checked}
                onChange={(e) => handleTimeChange(item.id, "start", e.target.value)}
              />
              <input
                type="time"
                min="00:00"
                max="23:59"
                className="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm leading-none text-gray-900 disabled:opacity-50"
                value={timeSlot?.end ?? ""}
                disabled={!timeSlot?.checked}
                onChange={(e) => handleTimeChange(item.id, "end", e.target.value)}
              />
            </div>
          );
        })}
      </div>
      {errors && <p>{errors.message?.toString()}</p>}
    </fieldset>
  );
}

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  value,
  checked,
  disabled,
  onChange,
  ...props
}) => {
  return (
    <input
      type="checkbox"
      id={id}
      value={value}
      checked={checked}
      disabled={disabled}
      data-state={checked ? "checked" : "unchecked"}
      data-disabled={disabled ? "true" : undefined}
      className="sr-only"
      onChange={onChange}
      {...props}
    />
  );
};

// { "monday": { "start": "", "end": "", "checked": true },
//   "tuesday": { "start": "", "end": "", "checked": true },
//   "wednesday": { "start": "", "end": "15:30", "checked": true },
//   "thursday": { "start": "15:29", "end": "", "checked": true },
//   "friday": { "start": "", "end": "", "checked": true },
//   "saturday": { "start": "", "end": "", "checked": false },
//   "sunday": { "start": "", "end": "", "checked": false }
// }
