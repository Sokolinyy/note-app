import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import {
  Note,
  addNote,
  clearAllNotes,
  updateNote,
} from "../redux/slices/noteSlise";
import { nanoid } from "@reduxjs/toolkit";

const NoteList: React.FC = () => {
  const notes = useSelector((state: RootState) => state.notes);
  const dispatch = useDispatch();

  const [noteCount, setNoteCount] = useState(1);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleAddNote = () => {
    const newNote: Note = {
      id: nanoid(),
      title: `Note № ${noteCount}`,
      content: "",
    };

    dispatch(addNote(newNote));
    // Clear input and text
    setSelectedNote(newNote);
    setNoteCount(noteCount + 1);
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedContent = event.target.value;
    // If selected note, return array, but with changed value of
    if (selectedNote) {
      const updatedTitle = updatedContent.slice(0, 20) || "Empty note...";
      const updatedNote = {
        ...selectedNote,
        title: updatedTitle,
        content: updatedContent,
      };
      setSelectedNote(updatedNote);
      dispatch(updateNote(updatedNote)); // Update the note in the Redux store
    }
  };

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
  };

  return (
    <div className="app-container">
      <div className="note-title">
        <div className="header">
          <h1>Note List</h1>
          <button className="add" onClick={handleAddNote}>
            +
          </button>
          <button className="delete-all">-</button>
        </div>
        <ul className="note-list">
          {notes.notes.map((note) => (
            <li
              key={note.id}
              className="title-container"
              onClick={() => handleNoteClick(note)}
            >
              <p>{note.title}</p> {/* Display the note's title */}
            </li>
          ))}
        </ul>
      </div>
      <div className="note-content">
        {notes.notes.length === 0 ? (
          <h2>Add note</h2>
        ) : (
          <textarea
            placeholder="Write something..."
            className="note-textarea"
            onChange={onChangeInput}
            ref={textAreaRef}
            value={selectedNote ? selectedNote.content : ""}
          ></textarea>
        )}
      </div>
    </div>
  );
};

export default NoteList;
