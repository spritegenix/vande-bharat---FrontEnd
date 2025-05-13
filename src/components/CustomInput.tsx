import * as React from "react";
import { cn } from "@/lib/utils";

export interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "block w-full rounded-md border border-input bg-background px-4 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:border-0 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    );
  },
);
CustomInput.displayName = "CustomInput";

export { CustomInput };
