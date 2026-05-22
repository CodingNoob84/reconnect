import { CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";

export const DatePickerField = ({
  field,
  label,
}: {
  field: any;
  label: string;
}) => {
  // Convert stored YYYY-MM-DD to Date object at UTC midnight
  const dateValue = field.state.value
    ? new Date(field.state.value + "T00:00:00")
    : undefined;

  const handleDateSelect = (date: Date | undefined) => {
    const dateString = date ? format(date, "yyyy-MM-dd") : undefined;

    field.handleChange(dateString);
  };

  return (
    <div className="space-y-1.5">
      <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className={`w-full bg-background hover:bg-accent text-black justify-start text-left font-normal text-xs rounded-xl ${
              field.state.meta.isTouched && field.state.meta.errors.length > 0
                ? "border-destructive focus-visible:ring-destructive border-2"
                : "border-border/60"
            }`}
          >
            <CalendarIcon className="mr-2 h-3.5 w-3.5" />
            {dateValue ? (
              format(dateValue, "PPP")
            ) : (
              <span className="text-muted-foreground">Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={dateValue}
            month={dateValue}
            onSelect={handleDateSelect}
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
      {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
        <p className="text-[10px] text-destructive mt-1">
          {field.state.meta.errors[0]?.message}
        </p>
      )}
    </div>
  );
};
