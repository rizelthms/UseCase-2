import clsx from "clsx"; // Importing the clsx library for conditional class names
import { twMerge } from "tailwind-merge"; // Importing the twMerge function from tailwind-merge library for merging Tailwind CSS classes

export default function Button(props) {
  // Destructuring props to extract variant and className
  const { variant = "primary", className, ...rest } = props;
  return (
    <button
      {...rest} // Spread operator to pass down any additional props
      className={twMerge(
        // Using twMerge to merge Tailwind CSS classes
        clsx(
          // Using clsx to conditionally generate class names
          // Base classes for the button
          "px-4 py-2 rounded-md border border-gray-300 whitespace-nowrap",
          "transition-colors hover:bg-[#3A0CA3] hover:bg-opacity-30 hover:text-black", // Classes for hover effects
          "text-xs font-medium", // Additional text styles
          {
            // Conditional classes based on variant prop
            "bg-[#3A0CA3] text-white": variant === "primary", // Primary variant classes
            "bg-white text-black": variant === "secondary", // Secondary variant classes
          }
        ),
        className // Additional classes passed as props
      )}
    />
  );
}
