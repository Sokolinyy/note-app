import React from "react";

interface DontHaveNoteProps {
  handleAddNote: () => void;
}

const DontHaveNote = ({ handleAddNote }: DontHaveNoteProps) => {
  return (
    <div className="dont-have-note-page">
      <h2>You don't have any notes yet.</h2>
      <button onClick={handleAddNote}>Create one</button>
    </div>
  );
};

export default DontHaveNote;
