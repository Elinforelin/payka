import React from "react";

export interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = "bottom",
  className = "",
}) => {
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  }[position];

  return (
    <div className={`group relative inline-flex items-center justify-center ${className}`}>
      {children}
      <div
        role="tooltip"
        className={`pointer-events-none absolute ${positionClasses} z-50 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-within:has-[:focus-visible]:opacity-100 transition-opacity duration-150 delay-75`}
      >
        <span className="whitespace-nowrap rounded-xl bg-[#1a1a1a] px-2.5 py-1 text-[11px] font-medium text-white shadow-lg tracking-wide">
          {content}
        </span>
      </div>
    </div>
  );
};
