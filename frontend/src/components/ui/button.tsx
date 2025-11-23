// frontend/src/components/ui/button.tsx
import * as React from "react";

type Variant = "default" | "outline" | "destructive";
type Size = "default" | "icon" | "sm";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const base =
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 disabled:opacity-50 disabled:pointer-events-none";

const variantClasses: Record<Variant, string> = {
  default: "bg-emerald-500 text-white hover:bg-emerald-600",
  outline:
    "border border-slate-700 bg-transparent text-slate-100 hover:bg-slate-800",
  destructive: "bg-red-500 text-white hover:bg-red-600",
};

const sizeClasses: Record<Size, string> = {
  default: "h-9 px-4 py-2",
  sm: "h-8 px-3",
  icon: "h-9 w-9",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
    return <button ref={ref} className={classes} {...props} />;
  },
);

Button.displayName = "Button";
