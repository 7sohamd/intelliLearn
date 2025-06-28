"use client";
import React from "react";
import { cn } from "@/lib/utils";

type HeroHighlightProps = React.PropsWithChildren<{
  className?: string;
  containerClassName?: string;
}>;

export const HeroHighlight = ({
  children,
  className,
  containerClassName
}: HeroHighlightProps) => {
  // SVG patterns for different states and themes
  const dotPatterns = {
    light: {
      default: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='rgba(184,80,66,0.4)' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`,
      hover: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='rgba(107,144,128,0.4)' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`,
    },
    dark: {
      default: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%23404040' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`,
      hover: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%238183f4' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`,
    },
  };

  return (
    <div
      className={cn(
        "group relative flex min-h-screen w-full items-center justify-center bg-white dark:bg-black",
        containerClassName
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 dark:hidden"
        style={{
          backgroundImage: dotPatterns.light.default,
        }} />
      <div
        className="pointer-events-none absolute inset-0 hidden dark:block"
        style={{
          backgroundImage: dotPatterns.dark.default,
        }} />
      <div className={cn("relative z-20", className)}>{children}</div>
    </div>
  );
};

type HighlightProps = React.PropsWithChildren<{
  className?: string;
}>;

export const Highlight = ({
  children,
  className
}: HighlightProps) => {
  return (
    <span
      className={cn(
        `relative inline-block rounded-lg bg-gradient-to-r from-indigo-800 to-purple-800 px-1 pb-1 dark:from-indigo-900 dark:to-purple-900`,
        className
      )}
    >
      {children}
    </span>
  );
};
