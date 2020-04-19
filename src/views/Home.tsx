import React, { useState } from "react";
import MdEditor from "../components/MdEditor";
import SideNotes from "../components/notes/SideNotes";

export default function Home() {
  const [selectedNote, setSelectedNote] = useState({} as any);
  const [fileDeletedCounter, setFileDeletedCounter] = useState(0);

  async function selectNote(singleNote: any) {
    console.log(singleNote);
    const data = await fetch(singleNote.url, {
      headers: {
        Authorization: `Token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3.raw",
      },
    });
    singleNote.content = await data.text();
    setSelectedNote(singleNote);
  }

  const fileDeleted = () => {
    // Do somthing to notify SideNotes
    setFileDeletedCounter(1 + fileDeletedCounter);
    console.log(fileDeletedCounter);
  };

  return (
    <div className="flex">
      <div className="w-1/4 bg-gray-100 text-left ">
        <SideNotes
          onSelectNote={selectNote}
          onFileDeleted={fileDeletedCounter}
        />
      </div>
      <div className="w-3/4 text-left p-2">
        <MdEditor note={selectedNote} onDelete={fileDeleted} />
      </div>
    </div>
  );
}
