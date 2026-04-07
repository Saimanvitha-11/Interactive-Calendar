export interface Note {
  id: number;
  date: string;
  title: string;
  content: string | null;
  color: string;
}

const NOTES_STORAGE_KEY = 'calendar_notes';
const NEXT_ID_STORAGE_KEY = 'calendar_next_id';

export const StorageService = {
  init: () => {
    if (!localStorage.getItem(NOTES_STORAGE_KEY)) {
      localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify([]));
    }
    if (!localStorage.getItem(NEXT_ID_STORAGE_KEY)) {
      localStorage.setItem(NEXT_ID_STORAGE_KEY, '1');
    }
  },

  getNotes: (): Note[] => {
    const data = localStorage.getItem(NOTES_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  getNotesByMonth: (year: number, month: number): Note[] => {
    const allNotes = StorageService.getNotes();
    return allNotes.filter(note => {
      const date = new Date(note.date);
      return date.getFullYear() === year && date.getMonth() === month - 1;
    });
  },

  getNoteById: (id: number): Note | undefined => {
    const allNotes = StorageService.getNotes();
    return allNotes.find(note => note.id === id);
  },

  createNote: (date: string, title: string, content: string, color: string): Note => {
    const allNotes = StorageService.getNotes();
    const nextId = parseInt(localStorage.getItem(NEXT_ID_STORAGE_KEY) || '1', 10);

    const newNote: Note = {
      id: nextId,
      date,
      title,
      content: content || null,
      color,
    };

    allNotes.push(newNote);
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(allNotes));
    localStorage.setItem(NEXT_ID_STORAGE_KEY, String(nextId + 1));

    return newNote;
  },

  updateNote: (id: number, title: string, content: string, color: string): Note | null => {
    const allNotes = StorageService.getNotes();
    const noteIndex = allNotes.findIndex(note => note.id === id);

    if (noteIndex === -1) return null;

    const updatedNote: Note = {
      ...allNotes[noteIndex],
      title,
      content: content || null,
      color,
    };

    allNotes[noteIndex] = updatedNote;
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(allNotes));

    return updatedNote;
  },

  deleteNote: (id: number): boolean => {
    const allNotes = StorageService.getNotes();
    const filteredNotes = allNotes.filter(note => note.id !== id);

    if (filteredNotes.length === allNotes.length) return false;

    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(filteredNotes));
    return true;
  },

  clearAll: () => {
    localStorage.removeItem(NOTES_STORAGE_KEY);
    localStorage.removeItem(NEXT_ID_STORAGE_KEY);
    StorageService.init();
  },
};
