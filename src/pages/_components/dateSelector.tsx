
import React from 'react';
import { CalendarIcon, ChevronDown } from 'lucide-react';
import { cn } from "@/lib/utils";

interface DateSelectorProps {
  availableDates: string[];
  selectedDate: string;
  onDateSelect: (date: string) => void;
  className?: string;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  availableDates,
  selectedDate,
  onDateSelect,
  className
}) => {
  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative">
        <select
          value={selectedDate}
          onChange={(e) => onDateSelect(e.target.value)}
          className="w-full pl-10 pr-8 py-2 appearance-none bg-white border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-hotel-primary focus:border-hotel-primary"
        >
          <option value="">Select a date</option>
          {availableDates.map((date) => (
            <option key={date} value={date}>
              {new Date(date).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              })}
            </option>
          ))}
        </select>
        <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
      </div>
    </div>
  );
};

export default DateSelector;
