import React from "react";
import StarIcon from "./StarIcon";

type TitleSize = "sm" | "md" | "lg" | "xl";

interface title {
  title: string;
  size: TitleSize;
}

const sizeClasses: Record<TitleSize, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

export default function TitleComp({ title, size }: title) {
  return (
    <div className="flex flex-col gap-3">
      <StarIcon className="w-6 h-6 text-[#ED1C24]" />
      <span className={`${sizeClasses[size]} font-semibold text text-[#ED1C24]`} >
        {title}
      </span>
    </div>
  );
}
