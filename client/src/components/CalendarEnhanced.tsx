import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday as datefnsIsToday,
  addMonths,
  subMonths,
} from 'date-fns';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';

interface CalendarEnhancedProps {
  onDateSelect?: (date: Date) => void;
  onDateRangeSelect?: (startDate: Date, endDate: Date) => void;
  noteDates?: string[];
  selectedRanges?: Array<{ startDate: string; endDate: string; color?: string }>;
}

export const CalendarEnhanced: React.FC<CalendarEnhancedProps> = ({
  onDateSelect,
  onDateRangeSelect,
  noteDates = [],
  selectedRanges = [],
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectionStart, setSelectionStart] = useState<Date | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<Date | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

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

  useKeyboardNavigation({
    onPreviousMonth: () => setCurrentDate(subMonths(currentDate, 1)),
    onNextMonth: () => setCurrentDate(addMonths(currentDate, 1)),
    onToday: () => setCurrentDate(new Date()),
  });

  const handlePreviousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const handleToday = () => setCurrentDate(new Date());

  const handleDateMouseDown = (date: Date) => {
    setIsSelecting(true);
    setSelectionStart(date);
    setSelectionEnd(date);
    onDateSelect?.(date);
  };

  const handleDateMouseEnter = (date: Date) => {
    setHoveredDate(date);
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

  const isRangeStart = (date: Date) => {
    if (!selectionStart || !selectionEnd) return false;
    const start = selectionStart.getTime() < selectionEnd.getTime() ? selectionStart : selectionEnd;
    return isSameDay(date, start);
  };

  const isRangeEnd = (date: Date) => {
    if (!selectionStart || !selectionEnd) return false;
    const end = selectionStart.getTime() < selectionEnd.getTime() ? selectionEnd : selectionStart;
    return isSameDay(date, end);
  };

  const hasNote = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return noteDates.includes(dateStr);
  };

  const isCurrentMonth = (date: Date) => isSameMonth(date, currentDate);
  const isToday = (date: Date) => datefnsIsToday(date);

  const todayDate = useMemo(() => new Date(), []);

  return (
    <div className="w-full">
      <div className="mb-8 space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap p-6 glass rounded-2xl">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePreviousMonth}
              className="p-3 rounded-xl hover:bg-primary/20 transition-all duration-200 hover:shadow-lg active:scale-95 group backdrop-blur-sm"
              aria-label="Previous month"
              title="Previous Month (← Arrow)"
            >
              <ChevronLeft className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
            </button>
            <button
              onClick={handleToday}
              className="px-4 py-2 rounded-xl hover:bg-primary/20 transition-all duration-200 hover:shadow-lg active:scale-95 text-sm font-medium backdrop-blur-sm border border-border/30"
              title="Go to Today (T)"
            >
              Today
            </button>
            <button
              onClick={handleNextMonth}
              className="p-3 rounded-xl hover:bg-primary/20 transition-all duration-200 hover:shadow-lg active:scale-95 group backdrop-blur-sm"
              aria-label="Next month"
              title="Next Month (→ Arrow)"
            >
              <ChevronRight className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
            </button>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-foreground shimmer">
            {format(currentDate, 'MMMM yyyy')}
          </h2>

          <div className="text-xs text-muted-foreground hidden sm:block">
            <kbd className="px-2 py-1 bg-muted rounded border border-border text-xs">←/→</kbd>
            <span className="mx-1">Navigate</span>
            <kbd className="px-2 py-1 bg-muted rounded border border-border text-xs">T</kbd>
            <span className="mx-1">Today</span>
          </div>
        </div>
      </div>

      <div className="bg-card/50 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden py-8 px-4 sm:px-12 border border-border/50 hover:border-border transition-all duration-300">
        <div className="grid grid-cols-7 gap-3 sm:gap-4 mb-8">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-xs sm:text-sm font-bold text-muted-foreground uppercase tracking-widest py-3 px-2 rounded-lg bg-muted/30 backdrop-blur-sm">
              {day}
            </div>
          ))}
        </div>

        <div
          className="grid grid-cols-7 gap-3 sm:gap-4"
          onMouseLeave={() => setIsSelecting(false)}
        >
          {allDays.map((date, idx) => {
            const inRange = isDateInRange(date);
            const isStart = isRangeStart(date);
            const isEnd = isRangeEnd(date);
            const hasNoteOnDate = hasNote(date);
            const isCurrentMonthDay = isCurrentMonth(date);
            const isTodayDate = isToday(date);
            const isHovered = hoveredDate && isSameDay(date, hoveredDate);

            return (
              <button
                key={idx}
                onMouseDown={() => isCurrentMonthDay && handleDateMouseDown(date)}
                onMouseEnter={() => handleDateMouseEnter(date)}
                onMouseUp={handleDateMouseUp}
                className={`
                  aspect-square p-2 rounded-xl transition-all duration-150 relative
                  flex flex-col items-center justify-center text-sm font-semibold
                  backdrop-blur-sm
                  ${!isCurrentMonthDay ? 'opacity-20 cursor-default text-muted-foreground' : ''}
                  ${isCurrentMonthDay && !inRange && !isStart && !isEnd && !isTodayDate && 'hover:bg-muted/70 active:scale-95 cursor-pointer hover:shadow-md border border-border/20'}
                  ${isTodayDate && 'ring-2 ring-primary/80 ring-offset-2 ring-offset-background shadow-lg'}
                  ${inRange && isCurrentMonthDay && 'bg-gradient-to-br from-primary/20 to-primary/10'}
                  ${isStart || isEnd ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-bold shadow-xl hover:shadow-2xl' : ''}
                  ${isHovered && (isStart || isEnd) && 'scale-110 shadow-xl'}
                `}
                disabled={!isCurrentMonthDay}
                type="button"
              >
                {inRange && isCurrentMonthDay && !isStart && !isEnd && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent rounded-xl animate-pulse-soft" />
                )}

                <span className="relative z-10 text-xs sm:text-sm">
                  {format(date, 'd')}
                </span>

                {hasNoteOnDate && isCurrentMonthDay && (
                  <div className="absolute bottom-1.5 w-2 h-2 rounded-full bg-accent/80 shadow-sm animate-pulse-soft" />
                )}

                {isTodayDate && (
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-white/90 shadow-md animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-10 pt-6 border-t border-border/30 flex flex-wrap gap-6 text-xs text-muted-foreground justify-center">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/30 backdrop-blur-sm">
            <div className="w-4 h-4 rounded-full bg-primary shadow-sm" />
            <span className="font-medium">Today</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/30 backdrop-blur-sm">
            <div className="w-4 h-4 rounded-full bg-accent/70" />
            <span className="font-medium">Has Notes</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/30 backdrop-blur-sm">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-primary to-primary/80" />
            <span className="font-medium">Selected Range</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarEnhanced;
