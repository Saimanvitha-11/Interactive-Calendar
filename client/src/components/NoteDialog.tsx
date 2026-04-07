import React, { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import { format } from 'date-fns';

interface NoteDialogProps {
  isOpen: boolean;
  date: Date | null;
  onClose: () => void;
  onSave: (title: string, content: string, color: string) => void;
  initialNote?: { title: string; content: string; color: string };
}

const COLOR_OPTIONS = [
  { value: 'default', label: 'Slate', gradient: 'from-slate-400 to-slate-600', bg: 'bg-gradient-to-br from-slate-100 to-slate-200' },
  { value: 'gold', label: 'Gold', gradient: 'from-amber-400 to-yellow-500', bg: 'bg-gradient-to-br from-amber-100 to-yellow-200' },
  { value: 'rose', label: 'Rose', gradient: 'from-rose-400 to-pink-500', bg: 'bg-gradient-to-br from-rose-100 to-pink-200' },
  { value: 'blue', label: 'Blue', gradient: 'from-blue-400 to-cyan-500', bg: 'bg-gradient-to-br from-blue-100 to-cyan-200' },
  { value: 'green', label: 'Green', gradient: 'from-emerald-400 to-teal-500', bg: 'bg-gradient-to-br from-emerald-100 to-teal-200' },
];

export const NoteDialog: React.FC<NoteDialogProps> = ({
  isOpen,
  date,
  onClose,
  onSave,
  initialNote,
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState('default');

  useEffect(() => {
    if (initialNote) {
      setTitle(initialNote.title);
      setContent(initialNote.content);
      setColor(initialNote.color);
    } else {
      setTitle('');
      setContent('');
      setColor('default');
    }
  }, [initialNote, isOpen]);

  const handleSave = () => {
    if (title.trim()) {
      onSave(title, content, color);
      setTitle('');
      setContent('');
      setColor('default');
    }
  };

  if (!isOpen || !date) return null;

  const selectedColor = COLOR_OPTIONS.find(c => c.value === color);

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gradient-to-br from-card to-card/80 rounded-3xl shadow-2xl p-8 max-w-md w-full animate-scale-in border border-border/50 backdrop-blur-sm space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="text-2xl font-bold text-foreground">
                {initialNote ? 'Edit' : 'Add'} Note
              </h3>
            </div>
            <p className="text-xs text-muted-foreground font-medium">
              {format(date, 'EEE, MMM d, yyyy')}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground hover:bg-muted/50 p-2 rounded-lg transition-all duration-200 active:scale-90"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-foreground mb-2.5 uppercase tracking-wide">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full px-4 py-3 rounded-xl bg-muted/40 border border-border/60 text-foreground placeholder-muted-foreground/60 focus:ring-2 focus:ring-primary/50 focus:outline-none transition-all duration-200 font-medium"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-foreground mb-2.5 uppercase tracking-wide">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Add details here..."
              className="w-full px-4 py-3 rounded-xl bg-muted/40 border border-border/60 text-foreground placeholder-muted-foreground/60 focus:ring-2 focus:ring-primary/50 focus:outline-none transition-all duration-200 resize-none h-28 font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-foreground mb-3 uppercase tracking-wide">
              Theme
            </label>
            <div className="grid grid-cols-5 gap-2.5">
              {COLOR_OPTIONS.map(option => (
                <button
                  key={option.value}
                  onClick={() => setColor(option.value)}
                  className={`
                    group relative h-12 rounded-xl transition-all duration-200
                    ${option.bg}
                    ${color === option.value 
                      ? 'ring-2 ring-offset-2 ring-offset-card ring-primary shadow-lg scale-105' 
                      : 'hover:scale-105 hover:shadow-md'}
                  `}
                  title={option.label}
                >
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-xs font-bold text-foreground/80 group-hover:text-foreground transition-colors">
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={onClose}
              className="px-4 py-3 rounded-xl border border-border/60 bg-muted/30 hover:bg-muted/50 text-foreground font-semibold transition-all duration-200 active:scale-95 hover:shadow-md"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!title.trim()}
              className="px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-accent hover:shadow-lg text-primary-foreground font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDialog;
