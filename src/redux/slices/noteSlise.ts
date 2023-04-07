import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Note {
  id: string;
  title: string;
  content: string;
}

export interface NoteState {
  notes: Note[];
}

const initialState: NoteState = {
  notes: [],
};

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote(state, action: PayloadAction<Note>) {
      state.notes.push(action.payload);
    },
    deleteAllNotes(state) {
      state.notes = [];
    },
    updateNote(state, action: PayloadAction<Note>) {
      const noteIndex = state.notes.findIndex(
        (note) => note.id === action.payload.id
      );
      if (noteIndex !== -1) {
        // Remove the note from the current position
        const updatedNote = state.notes.splice(noteIndex, 1)[0];
        // Update the note with new values
        updatedNote.title = action.payload.title;
        updatedNote.content = action.payload.content;
        // Add the note back to the beginning of the array
        state.notes.unshift(updatedNote);
      }
    },
    deleteCertainNote(state, action: PayloadAction<string>) {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
  },
});

export const { addNote, deleteAllNotes, updateNote, deleteCertainNote } =
  noteSlice.actions;

export default noteSlice.reducer;
