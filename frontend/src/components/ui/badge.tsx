// frontend/src/components/ui/badge.tsx
import * as React from "react";

type Variant = "default" | "outline" | "destructive" | "secondary";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
}

const variantClasses: Record<Variant, string> = {
  default: "bg-emerald-500/90 text-slate-950",
  outline: "border border-slate-600 text-slate-200",
  destructive: "bg-red-500/90 text-white",
  secondary: "bg-slate-700 text-slate-100",
};

export const Badge: React.FC<BadgeProps> = ({
  className = "",
  variant = "default",
  ...props
}) => {
  const classes = `inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${variantClasses[variant]} ${className}`;
  return <span className={classes} {...props} />;
};
