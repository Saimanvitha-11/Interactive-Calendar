import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  addMonths,
  subMonths,
} from 'date-fns';

interface CalendarProps {
  onDateSelect?: (date: Date) => void;
  onDateRangeSelect?: (startDate: Date, endDate: Date) => void;
  noteDates?: string[];
  selectedRanges?: Array<{ startDate: string; endDate: string; color?: string }>;
}

export const Calendar: React.FC<CalendarProps> = ({
  onDateSelect,
  onDateRangeSelect,
  noteDates = [],
  selectedRanges = [],
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectionStart, setSelectionStart] = useState<Date | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<Date | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const firstDayOfWeek = monthStart.getDay();
  const previousMonthDays = Array.from({ length: firstDayOfWeek }).map((_, i) => {
    const date = new Date(monthStart);
    date.setDate(date.getDate() - (firstDayOfWeek - i));
    return date;
  });

  const totalCells = previousMonthDays.length + calendarDays.length;
  const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
  const nextMonthDays = Array.from({ length: remainingCells }).map((_, i) => {
    const date = new Date(monthEnd);
    date.setDate(date.getDate() + i + 1);
    return date;
  });

  const allDays = [...previousMonthDays, ...calendarDays, ...nextMonthDays];
  const weeks = Array.from({ length: Math.ceil(allDays.length / 7) }).map((_, i) =>
    allDays.slice(i * 7, (i + 1) * 7)
  );

  const handlePreviousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const handleDateMouseDown = (date: Date) => {
    setIsSelecting(true);
    setSelectionStart(date);
    setSelectionEnd(date);
    onDateSelect?.(date);
  };

  const handleDateMouseEnter = (date: Date) => {
    if (!isSelecting || !selectionStart) return;

    const actualStart = selectionStart.getTime() < date.getTime() ? selectionStart : date;
    const actualEnd = selectionStart.getTime() < date.getTime() ? date : selectionStart;

    setSelectionStart(actualStart);
    setSelectionEnd(actualEnd);
  };

  const handleDateMouseUp = () => {
    setIsSelecting(false);
    if (selectionStart && selectionEnd) {
      onDateRangeSelect?.(selectionStart, selectionEnd);
    }
  };

  const isDateInRange = (date: Date) => {
    if (!selectionStart || !selectionEnd) return false;
    const start = selectionStart.getTime() < selectionEnd.getTime() ? selectionStart : selectionEnd;
    const end = selectionStart.getTime() < selectionEnd.getTime() ? selectionEnd : selectionStart;
    return date.getTime() >= start.getTime() && date.getTime() <= end.getTime();
  };

  const isDateInSelectedRange = (date: Date) => {
    return selectedRanges.some(range => {
      const startDate = new Date(range.startDate);
      const endDate = new Date(range.endDate);
      return date >= startDate && date <= endDate;
    });
  };

  const hasNote = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return noteDates.includes(dateStr);
  };

  const isCurrentMonth = (date: Date) => isSameMonth(date, currentDate);

  return (
    <div className="calendar-card w-full">
      <div className="month-header">
        <button
          onClick={handlePreviousMonth}
          className="elegant-button-outline p-2 flex-shrink-0"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <h2 className="month-title text-xl sm:text-2xl md:text-3xl text-center flex-1">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <button
          onClick={handleNextMonth}
          className="elegant-button-outline p-2 flex-shrink-0"
          aria-label="Next month"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      <div className="weekday-header gap-1 sm:gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="weekday-label text-xs sm:text-sm">
            {day}
          </div>
        ))}
      </div>

      <div
        className="calendar-grid gap-1 sm:gap-2"
        onMouseLeave={() => setIsSelecting(false)}
      >
        {allDays.map((date, idx) => {
          const inRange = isDateInRange(date);
          const inSelectedRange = isDateInSelectedRange(date);
          const hasNoteOnDate = hasNote(date);
          const isCurrentMonthDay = isCurrentMonth(date);

          return (
            <div
              key={idx}
              onMouseDown={() => handleDateMouseDown(date)}
              onMouseEnter={() => handleDateMouseEnter(date)}
              onMouseUp={handleDateMouseUp}
              className={`
                calendar-day
                ${inRange ? 'selected' : ''}
                ${inSelectedRange ? 'in-range' : ''}
                ${hasNoteOnDate ? 'has-notes' : ''}
                ${!isCurrentMonthDay ? 'opacity-30 cursor-default' : 'cursor-pointer'}
                ${!isCurrentMonthDay && 'disabled'}
              `}
            >
              <span className="calendar-day-number text-xs sm:text-sm">
                {format(date, 'd')}
              </span>
              {hasNoteOnDate && <div className="note-badge" />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
