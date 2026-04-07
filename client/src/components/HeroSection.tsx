import { useState, useMemo } from 'react';
import { format } from 'date-fns';

interface HeroSectionProps {
  currentDate: Date;
  selectedRangeStart?: Date | null;
  selectedRangeEnd?: Date | null;
}

const monthImages: Record<number, { gradient: string; description: string }> = {
  0: { gradient: 'from-blue-400 to-cyan-300', description: 'January - Fresh Start' },
  1: { gradient: 'from-purple-400 to-pink-300', description: 'February - Love & Light' },
  2: { gradient: 'from-green-400 to-emerald-300', description: 'March - Spring Awakening' },
  3: { gradient: 'from-pink-400 to-rose-300', description: 'April - Cherry Blossoms' },
  4: { gradient: 'from-yellow-400 to-orange-300', description: 'May - Warmth & Bloom' },
  5: { gradient: 'from-orange-400 to-red-300', description: 'June - Summer Begins' },
  6: { gradient: 'from-red-500 to-pink-400', description: 'July - Heat & Brightness' },
  7: { gradient: 'from-amber-400 to-orange-300', description: 'August - Golden Days' },
  8: { gradient: 'from-amber-500 to-orange-400', description: 'September - Harvest Time' },
  9: { gradient: 'from-orange-500 to-red-400', description: 'October - Autumn Fire' },
  10: { gradient: 'from-amber-600 to-yellow-500', description: 'November - Gratitude' },
  11: { gradient: 'from-blue-500 to-purple-400', description: 'December - Festive Joy' },
};

export function HeroSection({
  currentDate,
  selectedRangeStart,
  selectedRangeEnd,
}: HeroSectionProps) {
  const month = currentDate.getMonth();
  const monthData = monthImages[month] || monthImages[0];
  const monthName = format(currentDate, 'MMMM');
  
  const rangeText = useMemo(() => {
    if (!selectedRangeStart || !selectedRangeEnd) return null;
    const start = format(selectedRangeStart, 'MMM dd');
    const end = format(selectedRangeEnd, 'MMM dd');
    const days = Math.ceil(
      (selectedRangeEnd.getTime() - selectedRangeStart.getTime()) / (1000 * 60 * 60 * 24)
    ) + 1;
    return `${start} → ${end} (${days} days)`;
  }, [selectedRangeStart, selectedRangeEnd]);

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-2xl mb-8 sm:mb-0 sm:sticky sm:top-20 sm:h-screen sm:flex sm:flex-col sm:justify-between animate-fade-in">
      <div className={`absolute inset-0 bg-gradient-to-br ${monthData.gradient} opacity-95`} />
      
      <div className="absolute inset-0 opacity-30 mix-blend-overlay">
        <div className="absolute inset-0 animate-pulse-soft" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.4) 0%, transparent 50%)',
        }} />
      </div>

      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-white/20 animate-float"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              animation: `float ${3 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-8 sm:p-12 text-white flex flex-col justify-center">
        <div className="mb-8 transform hover:scale-105 transition-transform duration-500">
          <h2 className="text-5xl sm:text-6xl font-bold mb-2 drop-shadow-lg animate-fade-in">
            {monthName}
          </h2>
          <p className="text-lg sm:text-xl opacity-95 drop-shadow font-light">
            {monthData.description}
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="glass-dark p-4 rounded-lg backdrop-blur-md">
            <p className="text-sm opacity-90 mb-2">
              <span className="font-semibold">Year:</span> {currentDate.getFullYear()}
            </p>
            <p className="text-sm opacity-90">
              <span className="font-semibold">Week:</span> {Math.ceil((currentDate.getDate() + new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()) / 7)}
            </p>
          </div>
        </div>

        {rangeText && (
          <div className="mt-6 p-5 glass-dark rounded-lg border border-white/30 animate-slide-in-up hover-lift hover:border-white/50 transition-all duration-300">
            <p className="text-xs uppercase tracking-wider opacity-80 mb-2 font-semibold">✨ Selected Period</p>
            <p className="text-lg font-bold">{rangeText}</p>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none">
        <div className="text-9xl font-bold text-white drop-shadow-lg select-none animate-pulse-soft">
          {currentDate.getDate()}
        </div>
      </div>

      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl opacity-20" />
    </div>
  );
}
