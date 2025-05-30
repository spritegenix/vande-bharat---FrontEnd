import * as React from "react";
import { cn } from "@/lib/utils";

export interface CustomTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const CustomTextarea = React.forwardRef<HTMLTextAreaElement, CustomTextAreaProps>(
  ({ className, value, ...props }, ref) => {
    const internalRef = React.useRef<HTMLTextAreaElement>(null);

    const combinedRef = (node: HTMLTextAreaElement) => {
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
      internalRef.current = node;
    };

    const resize = () => {
      const textarea = internalRef.current;
      if (textarea) {
        textarea.style.height = "auto"; // Reset
        textarea.style.height = `${textarea.scrollHeight}px`; // Resize to content
      }
    };

    // Resize when value changes (e.g., on edit)
    React.useEffect(() => {
      resize();
    }, [value]);

    return (
      <textarea
        className={cn(
          "block w-full resize-none overflow-hidden rounded-md border border-input bg-background px-4 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={combinedRef}
        onInput={resize}
        rows={1}
        value={value}
        {...props}
      />
    );
  },
);

CustomTextarea.displayName = "CustomTextarea";
export { CustomTextarea };
