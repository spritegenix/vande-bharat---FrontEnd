import React, { ReactNode, ElementType } from "react";

interface WrapperProps {
  containerClassName?: string;
  bgColor?: string;
  isTop?: boolean;
  isTop2?: boolean;
  children: ReactNode;
  className?: string;
  isMaxWidthChangeRequired?: string;
  as?: ElementType;
  [key: string]: any;
}

export default function Wrapper({
  containerClassName = "",
  bgColor = "bg-transparent",
  isTop = false,
  isTop2 = false,
  children,
  className = "",
  isMaxWidthChangeRequired = "max-w-screen-2xl",
  as: Component = "section",
  ...props
}: WrapperProps) {
  return (
    <Component
      className={`w-full xl:px-10 ${bgColor} ${containerClassName} ${isTop && "pt-14"}`}
      {...props}
    >
      <div className={`mx-auto w-full ${isMaxWidthChangeRequired} ${className}`}>{children}</div>
    </Component>
  );
}
