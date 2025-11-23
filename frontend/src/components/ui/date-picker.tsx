// src/components/ui/date-picker.tsx
import { format } from "date-fns";
import { Calendar } from "./calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "./popover";
import { Button } from "./button";

export interface DatePickerProps {
  value: string | null; // yyyy-mm-dd
  onChange: (newVal: string) => void;
  placeholder?: string;
}

export function DatePicker({ value, onChange, placeholder = "Pick a date" }: DatePickerProps) {
  const selected = value ? new Date(value) : undefined;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left text-xs font-normal"
        >
          {selected ? format(selected, "PPP") : placeholder}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0 w-auto bg-slate-900 dark:bg-white border border-slate-700 dark:border-slate-300">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={(d) => {
            if (d) {
              const yyyy = d.getFullYear();
              const mm = String(d.getMonth() + 1).padStart(2, "0");
              const dd = String(d.getDate()).padStart(2, "0");
              onChange(`${yyyy}-${mm}-${dd}`);
            }
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
