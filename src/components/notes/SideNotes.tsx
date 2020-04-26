import React, { useState, useEffect } from "react";
import AddNote from "./AddNote";
import SingleSideNote from "./SingleSideNote";
import { TreeNote } from "../../utils/types/notes";
import { AppCtxt } from "../../Context";

export default function SideNotes({ onSelectNote, onContentChanges }: any) {
  const [notes, setNotes] = useState([] as any[]);
  const { sidenotes } = React.useContext(AppCtxt);

  useEffect(() => {
    setNotes(sidenotes);
  }, [sidenotes]);

  return (
    <>
      {notes &&
        Array.isArray(notes) &&
        notes.map((singleNote: TreeNote) => (
          <SingleSideNote
            key={singleNote.name}
            note={singleNote}
            selectNote={(selected: TreeNote) => {
              onSelectNote(selected);
            }}
          />
        ))}
      <hr />
      <AddNote onAddNote={onContentChanges} />
    </>
  );
}
