import { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import CalendarEnhanced from "@/components/CalendarEnhanced";
import NoteDialog from "@/components/NoteDialog";
import NotesSidebar from "@/components/NotesSidebar";
import { HeroSection } from "@/components/HeroSection";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { StorageService, type Note } from "@/lib/storage";

export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedRangeStart, setSelectedRangeStart] = useState<Date | null>(null);
  const [selectedRangeEnd, setSelectedRangeEnd] = useState<Date | null>(null);
  const [noteDialogOpen, setNoteDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    StorageService.init();
    loadNotes();
  }, []);

  useEffect(() => {
    loadNotes();
  }, [currentDate]);

  const loadNotes = () => {
    const monthNotes = StorageService.getNotesByMonth(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1
    );
    setNotes(monthNotes);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setEditingNote(null);
    setNoteDialogOpen(true);
  };

  const handleDateRangeSelect = (start: Date, end: Date) => {
    setSelectedRangeStart(start);
    setSelectedRangeEnd(end);
  };

  const handleSaveNote = (title: string, content: string, color: string) => {
    if (!selectedDate) return;

    const dateStr = format(selectedDate, "yyyy-MM-dd");

    if (editingNote) {
      StorageService.updateNote(editingNote.id, title, content, color);
    } else {
      StorageService.createNote(dateStr, title, content, color);
    }

    loadNotes();
    setNoteDialogOpen(false);
    setSelectedDate(null);
    setEditingNote(null);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setSelectedDate(parseISO(note.date));
    setNoteDialogOpen(true);
  };

  const handleDeleteNote = (id: number) => {
    StorageService.deleteNote(id);
    loadNotes();
  };

  const noteDates = notes.map((note) => note.date);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-gradient-to-b from-card/95 to-card/80 backdrop-blur-xl border-b border-border/50 shadow-lg">
        <div className="container mx-auto max-w-7xl flex items-center justify-between py-5 px-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground animate-fade-in">
              Calendar
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground font-light">
              ✨ Plan, organize & reflect
            </p>
          </div>
          <ThemeSwitcher />
        </div>
      </header>

      <main className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 hidden lg:block">
            <HeroSection
              currentDate={currentDate}
              selectedRangeStart={selectedRangeStart}
              selectedRangeEnd={selectedRangeEnd}
            />
          </div>

          <div className="lg:col-span-3 space-y-8">
            <div className="lg:hidden">
              <HeroSection
                currentDate={currentDate}
                selectedRangeStart={selectedRangeStart}
                selectedRangeEnd={selectedRangeEnd}
              />
            </div>

            <div className="animate-fade-in">
              <CalendarEnhanced
                onDateSelect={handleDateSelect}
                onDateRangeSelect={handleDateRangeSelect}
                noteDates={noteDates}
              />
            </div>

            <div className="space-y-6 animate-slide-in-up">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-1 w-12 bg-gradient-to-r from-primary to-accent rounded-full" />
                  <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                    Notes
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  {notes.length === 0 
                    ? 'Create your first note by clicking any date on the calendar' 
                    : `${notes.length} note${notes.length !== 1 ? 's' : ''} in ${format(currentDate, 'MMMM yyyy')}`}
                </p>
              </div>

              <div className="bg-gradient-to-br from-card to-card/50 rounded-3xl shadow-elegant border border-border/50 backdrop-blur-sm p-8 hover:shadow-lg transition-all duration-300">
                <NotesSidebar
                  notes={notes}
                  onEditNote={handleEditNote}
                  onDeleteNote={handleDeleteNote}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <NoteDialog
        isOpen={noteDialogOpen}
        date={selectedDate}
        onClose={() => {
          setNoteDialogOpen(false);
          setSelectedDate(null);
          setEditingNote(null);
        }}
        onSave={handleSaveNote}
        initialNote={
          editingNote
            ? {
                title: editingNote.title,
                content: editingNote.content || "",
                color: editingNote.color,
              }
            : undefined
        }
      />
    </div>
  );
}
