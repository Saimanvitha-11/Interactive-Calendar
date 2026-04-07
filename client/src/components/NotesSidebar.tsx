import React from 'react';
import { Trash2, Edit2, BookOpen, Sparkles } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface Note {
  id: number;
  date: string;
  title: string;
  content: string | null;
  color: string;
}

interface NotesSidebarProps {
  notes: Note[];
  onEditNote: (note: Note) => void;
  onDeleteNote: (id: number) => void;
}

const COLOR_GRADIENT: Record<string, { bg: string; border: string; accent: string }> = {
  default: { 
    bg: 'from-slate-50 to-slate-100/50', 
    border: 'border-slate-200/60',
    accent: 'from-slate-400 to-slate-600'
  },
  gold: { 
    bg: 'from-amber-50 to-yellow-50/40', 
    border: 'border-amber-200/60',
    accent: 'from-amber-400 to-yellow-500'
  },
  rose: { 
    bg: 'from-rose-50 to-pink-50/40', 
    border: 'border-rose-200/60',
    accent: 'from-rose-400 to-pink-500'
  },
  blue: { 
    bg: 'from-blue-50 to-cyan-50/40', 
    border: 'border-blue-200/60',
    accent: 'from-blue-400 to-cyan-500'
  },
  green: { 
    bg: 'from-emerald-50 to-teal-50/40', 
    border: 'border-emerald-200/60',
    accent: 'from-emerald-400 to-teal-500'
  },
};

export const NotesSidebar: React.FC<NotesSidebarProps> = ({
  notes,
  onEditNote,
  onDeleteNote,
}) => {
  if (notes.length === 0) {
    return (
      <div className="py-16 px-6 text-center space-y-6">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-2xl animate-pulse-soft" />
            <BookOpen className="w-16 h-16 text-primary/60 relative" />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-lg font-semibold text-foreground">
            No notes yet
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Click any date to create your first note and start organizing your thoughts
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 scroll-smooth">
      {notes.map((note, idx) => {
        const colors = COLOR_GRADIENT[note.color] || COLOR_GRADIENT.default;
        
        return (
          <div
            key={note.id}
            className="group"
            style={{
              animation: `slideInUp 0.5s ease-out ${idx * 0.08}s backwards`,
            }}
          >
            <div
              className={`
                relative rounded-2xl border backdrop-blur-sm
                transition-all duration-300 overflow-hidden
                hover:shadow-lg hover:-translate-y-1
                bg-gradient-to-br ${colors.bg} border-gradient ${colors.border}
              `}
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
              
              <div className="relative p-5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${colors.accent}`} />
                      <h4 className="font-bold text-foreground truncate text-base leading-tight">
                        {note.title}
                      </h4>
                    </div>
                    <p className="text-xs text-muted-foreground/80 font-medium">
                      {format(parseISO(note.date), 'EEE, MMM d')}
                    </p>
                  </div>
                  
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 flex-shrink-0">
                    <button
                      onClick={() => onEditNote(note)}
                      className="p-2 hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg transition-all duration-200 active:scale-90 hover:scale-110"
                      title="Edit note"
                    >
                      <Edit2 className="w-4 h-4 text-primary" />
                    </button>
                    <button
                      onClick={() => onDeleteNote(note.id)}
                      className="p-2 hover:bg-destructive/10 dark:hover:bg-destructive/20 rounded-lg transition-all duration-200 active:scale-90 hover:scale-110"
                      title="Delete note"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </button>
                  </div>
                </div>
                
                {note.content && (
                  <p className="text-sm text-foreground/75 leading-relaxed line-clamp-3 pt-1">
                    {note.content}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NotesSidebar;
