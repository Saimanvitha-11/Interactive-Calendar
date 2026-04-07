import { useEffect, useCallback } from 'react';
import { addMonths, subMonths } from 'date-fns';

interface UseKeyboardNavigationProps {
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onToday?: () => void;
}

export function useKeyboardNavigation({
  onPreviousMonth,
  onNextMonth,
  onToday,
}: UseKeyboardNavigationProps) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
      return;
    }

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        onPreviousMonth();
        break;
      case 'ArrowRight':
        event.preventDefault();
        onNextMonth();
        break;
      case 't':
      case 'T':
        event.preventDefault();
        onToday?.();
        break;
      default:
        break;
    }
  }, [onPreviousMonth, onNextMonth, onToday]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
