import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import {
  Note,
  addNote,
  updateNote,
  deleteAllNotes,
  deleteCertainNote,
} from "../redux/slices/noteSlise";
import { nanoid } from "@reduxjs/toolkit";

import DontHaveNote from "./DontHaveNote";
import trashIcon from "../assets/trash-icon.svg";
import createNoteIcon from "../assets/note-svgrepo-com.svg";
import deleteNoteIcon from "../assets/delete-clipboard-svgrepo-com.svg";

const NoteList: React.FC = () => {
  const notes = useSelector((state: RootState) => state.notes);
  const dispatch = useDispatch();

  const [noteCount, setNoteCount] = useState(1);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [showNoteTitle, setShowNoteTitle] = useState(false);
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
      const updatedNote = {
        ...selectedNote,
        title: updatedContent,
        content: updatedContent,
      };
      setSelectedNote(updatedNote);
      dispatch(updateNote(updatedNote)); // Update the note in the Redux store
    }
  };

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
  };

  const handleDeleteAllNotes = () => {
    const confirmDeleteAll = window.confirm(
      "Are you sure you want to delete all notes?"
    );
    if (confirmDeleteAll) {
      dispatch(deleteAllNotes());
    }
  };

  const handleDeleteNote = (noteId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete the note?"
    );
    if (confirmDelete) {
      dispatch(deleteCertainNote(noteId));
    }
  };

  const toggleNoteTitle = () => {
    setShowNoteTitle(!showNoteTitle);
  };

  useEffect(() => {
    if (notes.notes.length < 1) {
      setNoteCount(1);
    }

    localStorage.setItem("notes", JSON.stringify(notes.notes));
  }, [notes.notes]);

  return (
    <div className="app-container">
      <button
        className={`hamburger-menu ${showNoteTitle ? "open" : ""}`}
        onClick={toggleNoteTitle}
      >
        ☰
      </button>
      <div className={`note-title${showNoteTitle ? " open" : ""}`}>
        {notes.notes.length > 0 && (
          <div className="header">
            <h1>Note List</h1>
            <div className="button-container">
              <button className="add" onClick={handleAddNote}>
                <img src={createNoteIcon} alt="" />
              </button>
              <button className="delete-all" onClick={handleDeleteAllNotes}>
                <img src={deleteNoteIcon} alt="" />
              </button>
            </div>
          </div>
        )}
        <ul className="note-list">
          {notes.notes.map((note) => (
            <li
              key={note.id}
              className={`title-container ${
                selectedNote && note.id === selectedNote.id ? "active" : ""
              }`}
              onClick={() => handleNoteClick(note)}
            >
              <p className="">
                {note.title.length > 0 ? (
                  note.title.length > 20 ? (
                    `${note.title.slice(0, 20)}...`
                  ) : (
                    note.title
                  )
                ) : (
                  <span className="empty-note-title">Empty note...</span>
                )}
              </p>
              <img
                className="trash-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteNote(note.id);
                }}
                src={trashIcon}
                alt=""
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="note-content">
        {notes.notes.length === 0 ? (
          <DontHaveNote handleAddNote={handleAddNote} />
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
