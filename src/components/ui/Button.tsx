"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

type MotionButtonProps = ButtonProps & Omit<HTMLMotionProps<"button">, keyof ButtonProps>;

const variants = {
  primary: "bg-primary hover:bg-primary-dark text-white shadow-sm",
  secondary: "bg-graphite hover:bg-steel-700 text-white shadow-sm",
  outline: "border-2 border-steel-200 hover:border-primary text-graphite hover:text-primary bg-transparent",
  ghost: "text-steel-500 hover:text-graphite hover:bg-steel-100 bg-transparent",
};

const sizes = {
  sm: "px-4 py-2 text-sm min-h-[40px]",
  md: "px-5 py-3 text-sm min-h-[44px]",
  lg: "px-8 py-4 text-base min-h-[52px]",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  className,
  fullWidth,
  ...props
}: MotionButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-colors",
    "focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className
  );

  if (href) {
    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
        <Link href={href} className={classes}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={classes}
      {...props}
    >
      {children}
    </motion.button>
  );
}
