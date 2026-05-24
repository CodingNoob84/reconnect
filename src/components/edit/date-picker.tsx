import { CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format, parseISO } from "date-fns";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";

interface DatePickerFieldProps {
  field: any;
  label: string;
}

export const DatePickerField = ({ field, label }: DatePickerFieldProps) => {
  // Safely parse YYYY-MM-DD
  const dateValue = field.state.value ? parseISO(field.state.value) : undefined;

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) {
      field.handleChange("");
      return;
    }

    field.handleChange(format(date, "yyyy-MM-dd"));
  };

  const hasError = field.state.meta.errors.length > 0;

  return (
    <div className="space-y-1.5">
      <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </Label>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal text-xs rounded-xl",
              !dateValue && "text-muted-foreground",
              hasError && "border-destructive",
            )}
          >
            <CalendarIcon className="mr-2 h-3.5 w-3.5" />

            {dateValue ? format(dateValue, "PPP") : "Pick a date"}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={dateValue}
            onSelect={handleDateSelect}
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>

      {hasError && (
        <p className="text-[10px] text-destructive mt-1" role="alert">
          {field.state.meta.errors[0]?.message}
        </p>
      )}
    </div>
  );
};
