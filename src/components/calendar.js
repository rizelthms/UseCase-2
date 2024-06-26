import * as React from "react";
import { DayPicker } from "react-day-picker"; // Importing DayPicker component from react-day-picker
import { ChevronLeft, ChevronRight } from "react-feather"; // Importing ChevronLeft and ChevronRight components from react-feather
import { twMerge } from "tailwind-merge"; // Importing twMerge function from tailwind-merge library

function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
  // Functional component named Calendar receiving props like className, classNames, showOutsideDays with a default value of true, and other props
  return (
    <DayPicker
      fromDate={new Date()}
      numberOfMonths={2} // Add numberOfMonths prop to display two months
      showOutsideDays={showOutsideDays} // Prop to control whether to show days outside of the current month
      className={twMerge("p-3", className)} // Applying Tailwind CSS classes to the DayPicker component, merging the existing className with "p-3"
      classNames={{
        // Object defining custom class names for different parts of the DayPicker component
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: " rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
        day_range_end: "bg-palette-primary text-white",
        day_selected: "bg-palette-primary text-white",
        day_today: "",
        day_outside: "opacity-50 aria-selected:opacity-30",
        day_disabled: "opacity-50",
        day_range_middle:
          "bg-palette-primary bg-opacity-30 text-gray-800 !rounded-none",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props} // Spread operator to pass any additional props to the DayPicker component
    />
  );
}
Calendar.displayName = "Calendar"; // Setting the display name of the Calendar component

export { Calendar };
