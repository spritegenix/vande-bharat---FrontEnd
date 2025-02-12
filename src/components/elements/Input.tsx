"use client";
import React, { useId, ChangeEvent, forwardRef, TextareaHTMLAttributes } from "react";

export const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props }: any,
  ref,
) {
  const id = useId();
  return (
    <div className="relative mt-5 h-11 w-full min-w-[100px]">
      <input
        id={id}
        type={type}
        className={`peer h-full w-full rounded-md border border-gray-200 bg-transparent bg-white ${props.disabled ? "cursor-not-allowed bg-zinc-50" : ""} px-3 py-3 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 focus:border-2 focus:border-bg1 focus:border-t-transparent focus:outline-0 ${className}`}
        ref={ref}
        {...props}
      />
      {label && (
        <label
          className="before:content[' '] after:content[' '] before:border-blue-gray-200 after:border-blue-gray-200 peer-placeholder-shown:text-blue-gray-500 pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none !overflow-visible truncate text-[12px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mr-1 before:mt-[6.5px] before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-l before:border-t before:transition-all after:pointer-events-none after:ml-1 after:mt-[6.5px] after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-r after:border-t after:transition-all focus:border-t-transparent peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[13px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-l-2 peer-focus:before:border-t-2 peer-focus:before:!border-bg1 peer-focus:after:border-r-2 peer-focus:after:border-t-2 peer-focus:after:!border-bg1"
          htmlFor={id}
        >
          {label}
        </label>
      )}
    </div>
  );
});

export const TextArea = React.forwardRef(function Input(
  { label, type = "text", className = "", rows, ...props }: any,
  ref,
) {
  const id = useId();
  return (
    <div className="relative mt-2 w-full min-w-[100px]">
      <textarea
        id={id}
        type={type}
        className={`peer h-full w-full rounded-md border border-gray-200 bg-transparent bg-white px-3 py-3 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 focus:border-2 focus:border-bg1 focus:border-t-transparent focus:outline-0 ${className}`}
        ref={ref}
        rows={rows}
        {...props}
      />
      {label && (
        <label
          className="before:content[' '] after:content[' '] before:border-blue-gray-200 after:border-blue-gray-200 peer-placeholder-shown:text-blue-gray-500 pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none !overflow-visible truncate text-[12px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mr-1 before:mt-[6.5px] before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-l before:border-t before:transition-all after:pointer-events-none after:ml-1 after:mt-[6.5px] after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-r after:border-t after:transition-all focus:border-t-transparent peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[13px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-l-2 peer-focus:before:border-t-2 peer-focus:before:!border-bg1 peer-focus:after:border-r-2 peer-focus:after:border-t-2 peer-focus:after:!border-bg1"
          htmlFor={id}
        >
          {label}
        </label>
      )}
    </div>
  );
});

interface TextareaAutoGrowingProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  rows?: number;
  error?: boolean;
}

export const TextareaAutoGrowing = forwardRef<HTMLTextAreaElement, TextareaAutoGrowingProps>(
  function TextareaAutoGrowing({ label, className = "", rows = 1, error, ...props }, ref) {
    const id = useId();
    const maxRows = undefined; // You can set a max number of rows

    const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
      const textarea = e.target;
      textarea.style.height = "auto";

      const style = window.getComputedStyle(textarea);
      const borderHeight = parseInt(style.borderTopWidth) + parseInt(style.borderBottomWidth);
      const paddingHeight = parseInt(style.paddingTop) + parseInt(style.paddingBottom);

      const lineHeight = parseInt(style.lineHeight);
      const maxHeight = maxRows ? lineHeight * maxRows + borderHeight + paddingHeight : Infinity;

      const newHeight = Math.min(textarea.scrollHeight + borderHeight, maxHeight);

      textarea.style.height = `${newHeight}px`;
    };

    return (
      <div className="relative mt-2 w-full min-w-[100px]">
        <textarea
          id={id}
          className={`peer h-full w-full rounded-md border ${
            error ? "border-red-500" : "border-gray-200"
          } bg-transparent bg-white px-3 py-3 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 focus:border-2 focus:border-bg1 focus:border-t-transparent focus:outline-0 ${className}`}
          ref={ref}
          onInput={handleInput}
          rows={rows}
          {...props}
        />
        {label && (
          <label
            className={`before:content[' '] after:content[' '] before:border-blue-gray-200 after:border-blue-gray-200 peer-placeholder-shown:text-blue-gray-500 pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none !overflow-visible truncate text-[12px] font-normal leading-tight ${
              error ? "text-red-500" : "text-gray-500"
            } transition-all before:pointer-events-none before:mr-1 before:mt-[6.5px] before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-l before:border-t before:transition-all after:pointer-events-none after:ml-1 after:mt-[6.5px] after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-r after:border-t after:transition-all focus:border-t-transparent peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[13px] peer-focus:leading-tight peer-focus:${
              error ? "text-red-500" : "text-gray-900"
            } peer-focus:before:border-l-2 peer-focus:before:border-t-2 peer-focus:before:!border-${
              error ? "red-500" : "bg1"
            } peer-focus:after:border-r-2 peer-focus:after:border-t-2 peer-focus:after:!border-${
              error ? "red-500" : "bg1"
            }`}
            htmlFor={id}
          >
            {label}
          </label>
        )}
      </div>
    );
  },
);
