import React, { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Input } from "../ui/input";
export interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [show, setShow] = useState(false);
    return (
      <div className="relative w-full">
        <Input
          type={show ? "text" : "password"}
          ref={ref}
          className={className + " pr-10"}
          {...props}
          value={props.value ?? ""}
        />
        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
        >
          {show ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
        </button>
      </div>
    );
  },
);
PasswordInput.displayName = "PasswordInput";
