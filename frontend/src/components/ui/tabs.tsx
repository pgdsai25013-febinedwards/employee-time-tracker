// frontend/src/components/ui/tabs.tsx
import * as React from "react";

type TabsContextValue = {
  value: string;
  setValue?: (value: string) => void;
};

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined);

export interface TabsProps {
  value: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({
  value,
  onValueChange,
  children,
}) => {
  return (
    <TabsContext.Provider value={{ value, setValue: onValueChange }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  ...props
}) => (
  <div
    className={`inline-flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900/80 p-1 ${className}`}
    {...props}
  />
);

export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  className = "",
  children,
  ...props
}) => {
  const ctx = React.useContext(TabsContext);
  const isActive = ctx?.value === value;

  const base =
    "px-3 py-1 text-xs rounded-md border border-transparent transition-colors";
  const activeClasses = "bg-slate-800 text-slate-100 border-slate-700";
  const inactiveClasses =
    "text-slate-400 hover:text-slate-100 hover:bg-slate-800";

  return (
    <button
      type="button"
      className={`${base} ${isActive ? activeClasses : inactiveClasses} ${className}`}
      onClick={(e) => {
        ctx?.setValue?.(value);
        props.onClick?.(e);
      }}
    >
      {children}
    </button>
  );
};
