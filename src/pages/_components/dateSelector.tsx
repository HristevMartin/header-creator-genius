
import React from 'react';
import { Calendar } from 'lucide-react';

interface DateSelectorProps {
  availableDates: string[];
  selectedDate: string;
  onDateSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ 
  availableDates, 
  selectedDate, 
  onDateSelect 
}) => {
  // Format date to be more readable (e.g., "Mon, 12 Apr")
  const formatDateOption = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      weekday: 'short', 
      day: '2-digit', 
      month: 'short' 
    });
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
        <Calendar className="h-4 w-4 text-hotel-primary" />
      </div>
      <select 
        value={selectedDate || ''} 
        onChange={onDateSelect}
        className="block w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-hotel-primary focus:border-hotel-primary bg-white"
        required
      >
        <option value="" disabled>Select date</option>
        {availableDates.map((date) => (
          <option key={date} value={date}>
            {formatDateOption(date)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DateSelector;
