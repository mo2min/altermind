import React, { useState, useEffect } from "react";
import MdEditor from "../components/MdEditor";

export default function Home() {
  const [notes, setNotes] = useState([] as any[]);
  const [selectedNote, setSelectedNote] = useState({} as any);

  useEffect(() => {
    async function fetchNotes() {
      const data = await fetch(
        `https://api.github.com/repos/fireb1003/noterepo-repo/contents`,
        {
          headers: {
            Authorization: "Token 166278492c37eb5265bef0f13f4fc664ca11f616",
            Accept: "application/vnd.github.v3.raw",
          },
        }
      );
      const notes = (await data.json()) as any[];
      setNotes(notes);
    }
    fetchNotes();
  });

  async function selectNote(singleNote: any) {
    console.log(singleNote);
    const data = await fetch(singleNote.url, {
      headers: {
        Authorization: "Token 166278492c37eb5265bef0f13f4fc664ca11f616",
        Accept: "application/vnd.github.v3.raw",
      },
    });
    singleNote.content = await data.text();
    setSelectedNote(singleNote);
  }

  return (
    <div className="flex">
      <div className="w-1/4 bg-gray-100 text-left ">
        {notes &&
          notes.map((singleNote) => (
            <h2
              key={singleNote.name}
              className="text-2xl"
              onClick={() => selectNote(singleNote)}
            >
              {singleNote.name.replace(".md", "")}
            </h2>
          ))}
      </div>
      <div className="w-3/4 text-left p-2">
        <MdEditor content={selectedNote.content} />
      </div>
    </div>
  );
}
