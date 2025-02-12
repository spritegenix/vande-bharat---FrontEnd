type WorkingHour = {
  dayOfWeek: string;
  openingTime: string;
  closingTime: string;
  toDelete: boolean;
};

type DayTiming = {
  start: string;
  end: string;
  checked: boolean;
};

type DayTimingsDefaultValue = {
  [key: string]: DayTiming;
};

const reverseDaysMap: Record<string, string> = {
  monday: "MONDAY",
  tuesday: "TUESDAY",
  wednesday: "WEDNESDAY",
  thursday: "THURSDAY",
  friday: "FRIDAY",
  saturday: "SATURDAY",
  sunday: "SUNDAY",
};

export function convertToWorkingHour(dayTimings: DayTimingsDefaultValue): WorkingHour[] {
  return (
    Object.entries(dayTimings)
      // .filter(([, { start, end, checked }]) => checked && start && end)
      .map(([day, { start, end, checked }]) => ({
        dayOfWeek: reverseDaysMap[day],
        openingTime: start,
        closingTime: end,
        toDelete: !checked,
      }))
  );
}

// Example usage
// const dayTimingsDefaultValue: DayTimingsDefaultValue = {
//   monday: { start: "10:30", end: "16:00", checked: true },
//   tuesday: { start: "", end: "", checked: false },
//   wednesday: { start: "9:00", end: "16:00", checked: true },
//   thursday: { start: "", end: "", checked: false },
//   friday: { start: "10:00", end: "18:00", checked: true },
//   saturday: { start: "", end: "", checked: false },
//   sunday: { start: "", end: "", checked: false },
// };

// const workingHour: WorkingHour[] = convertToWorkingHour(dayTimingsDefaultValue);
// console.log(workingHour);

// [
//     { dayOfWeek: "MONDAY", openingTime: "10:30", closingTime: "16:00" },
//     { dayOfWeek: "WEDNESDAY", openingTime: "9:00", closingTime: "16:00" },
//     { dayOfWeek: "FRIDAY", openingTime: "10:00", closingTime: "18:00" }
//   ]

const daysMap: Record<string, string> = {
  MONDAY: "monday",
  TUESDAY: "tuesday",
  WEDNESDAY: "wednesday",
  THURSDAY: "thursday",
  FRIDAY: "friday",
  SATURDAY: "saturday",
  SUNDAY: "sunday",
};

export function convertToDayTimingsDefaultValue(
  workingHour: WorkingHour[],
): DayTimingsDefaultValue {
  // Initialize the default structure for all days
  const dayTimings: DayTimingsDefaultValue = {
    monday: { start: "", end: "", checked: false },
    tuesday: { start: "", end: "", checked: false },
    wednesday: { start: "", end: "", checked: false },
    thursday: { start: "", end: "", checked: false },
    friday: { start: "", end: "", checked: false },
    saturday: { start: "", end: "", checked: false },
    sunday: { start: "", end: "", checked: false },
  };

  // Map working hours to the appropriate days
  workingHour &&
    workingHour.length > 0 &&
    workingHour.forEach(({ dayOfWeek, openingTime, closingTime }) => {
      const dayKey = daysMap[dayOfWeek];
      if (dayKey) {
        dayTimings[dayKey] = {
          start: openingTime,
          end: closingTime,
          checked: true,
        };
      }
    });

  return dayTimings;
}
