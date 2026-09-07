import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@findrey/components/ui/button';
import { Calendar } from '@findrey/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@findrey/components/ui/popover';
import { cn } from '@findrey/lib/utils';

interface DatePickerV2Props {
  value?: Date | null;
  onChange?: (date: Date | undefined) => void;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export function DatePickerV2({
  value,
  onChange,
  label = 'Pick a date',
  disabled,
  required,
  className,
}: DatePickerV2Props) {
  return (
    <Popover>
      <PopoverTrigger asChild disabled={disabled}>
        <Button
          variant="outline"
          size="default"
          className={cn(
            'h-9 w-full justify-start gap-2 px-3 text-left font-normal',
            !value && 'text-muted-foreground',
            required && !value && 'border-destructive/50',
            className,
          )}
          aria-required={required}
        >
          <CalendarIcon className="size-4 shrink-0 text-cyan-400" />
          {value ? (
            <span className="truncate">{format(value, 'PP')}</span>
          ) : (
            <span className="truncate">{label}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value ?? undefined}
          onSelect={onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}