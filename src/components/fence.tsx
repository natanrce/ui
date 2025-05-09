"use client";

import { cn } from "@/lib/utils";
import { File, Terminal, LucideProps } from "lucide-react";
import React, { useState, useEffect } from "react";

interface PreProps extends React.HTMLProps<HTMLPreElement> {
  filename?: string;
  __rawstring__?: string;
  ["data-language"]?: string;
}

const filenameIcons = {
  bash: Terminal,
  tsx: (props: LucideProps) => (
    <svg
      height="14"
      viewBox="0 0 512 512"
      width="14"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect fill="currentColor" height="512" rx="50" width="512" />
      <rect fill="currentColor" height="512" rx="50" width="512" />
      <path
        clipRule="evenodd"
        d="m316.939 407.424v50.061c8.138 4.172 17.763 7.3 28.875 9.386s22.823 3.129 35.135 3.129c11.999 0 23.397-1.147 34.196-3.442 10.799-2.294 20.268-6.075 28.406-11.342 8.138-5.266 14.581-12.15 19.328-20.65s7.121-19.007 7.121-31.522c0-9.074-1.356-17.026-4.069-23.857s-6.625-12.906-11.738-18.225c-5.112-5.319-11.242-10.091-18.389-14.315s-15.207-8.213-24.18-11.967c-6.573-2.712-12.468-5.345-17.685-7.9-5.217-2.556-9.651-5.163-13.303-7.822-3.652-2.66-6.469-5.476-8.451-8.448-1.982-2.973-2.974-6.336-2.974-10.091 0-3.441.887-6.544 2.661-9.308s4.278-5.136 7.512-7.118c3.235-1.981 7.199-3.52 11.894-4.615 4.696-1.095 9.912-1.642 15.651-1.642 4.173 0 8.581.313 13.224.938 4.643.626 9.312 1.591 14.008 2.894 4.695 1.304 9.259 2.947 13.694 4.928 4.434 1.982 8.529 4.276 12.285 6.884v-46.776c-7.616-2.92-15.937-5.084-24.962-6.492s-19.381-2.112-31.066-2.112c-11.895 0-23.163 1.278-33.805 3.833s-20.006 6.544-28.093 11.967c-8.086 5.424-14.476 12.333-19.171 20.729-4.695 8.395-7.043 18.433-7.043 30.114 0 14.914 4.304 27.638 12.912 38.172 8.607 10.533 21.675 19.45 39.204 26.751 6.886 2.816 13.303 5.579 19.25 8.291s11.086 5.528 15.415 8.448c4.33 2.92 7.747 6.101 10.252 9.543 2.504 3.441 3.756 7.352 3.756 11.733 0 3.233-.783 6.231-2.348 8.995s-3.939 5.162-7.121 7.196-7.147 3.624-11.894 4.771c-4.748 1.148-10.303 1.721-16.668 1.721-10.851 0-21.597-1.903-32.24-5.71-10.642-3.806-20.502-9.516-29.579-17.13zm-84.159-123.342h64.22v-41.082h-179v41.082h63.906v182.918h50.874z"
        fill="var(--ds-background-100)"
        fillRule="evenodd"
      />
    </svg>
  ),
};

type FilenameIcon = keyof typeof filenameIcons;

export function Fence(props: PreProps) {
  const {
    filename,
    children,
    __rawstring__ = "",
    "data-language": language,
  } = props;
  const [isCopied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(__rawstring__).then(() => setCopied(true));
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCopied(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [isCopied]);

  return (
    <div className="not-prose">
      <div className="group relative my-4 rounded-lg border border-[#2e2e2e]">
        {filename && (
          <div className="flex h-12 items-center border-b border-b-[#2e2e2e] pl-4 pr-3">
            <div className="flex items-center gap-2 text-[13px]">
              {React.createElement(
                filenameIcons[language as FilenameIcon] ?? File,
                { className: "size-4" }
              )}
              <span>{filename}</span>
            </div>
          </div>
        )}
        <pre
          className="overflow-auto rounded-lg border-[#2e2e2e] bg-[#0a0a0a] py-5 text-[#eaeaea]"
          {...props}
        >
          {children}
        </pre>
        <button
          className="absolute right-3.5 top-3.5 flex size-8 items-center justify-center overflow-hidden rounded-[5px] font-medium opacity-0 backdrop-blur transition hover:bg-[#1f1f1f] hover:text-[#a0a0a0] focus:opacity-100 group-hover:opacity-100"
          onClick={copyToClipboard}
        >
          <svg
            fill="none"
            height={20}
            shapeRendering="geometricPrecision"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            width={20}
            className={cn(
              "pointer-events-none flex items-center gap-0.5 transition duration-300",
              isCopied && "-translate-y-1.5 opacity-0"
            )}
          >
            <path d="M6 17C4.89543 17 4 16.1046 4 15V5C4 3.89543 4.89543 3 6 3H13C13.7403 3 14.3866 3.4022 14.7324 4M11 21H18C19.1046 21 20 20.1046 20 19V9C20 7.89543 19.1046 7 18 7H11C9.89543 7 9 7.89543 9 9V19C9 20.1046 9.89543 21 11 21Z" />
          </svg>
          <svg
            fill="none"
            height="20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            width="20"
            className={cn(
              "pointer-events-none flex items-center absolute transition duration-300",
              !isCopied && "translate-y-1.5 opacity-0"
            )}
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
