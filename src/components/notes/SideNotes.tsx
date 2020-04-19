import React, { useState, useEffect } from "react";
import AddNote from "./AddNote";

export default function SideNotes({ onSelectNote, onFileDeleted }: any) {
  const [notes, setNotes] = useState([] as any[]);
  const [eTag, setETag] = useState("" as any);
  const [fetchyCount, setFetchyCount] = useState(0);

  useEffect(() => {
    console.log("onDelete", onFileDeleted);
    async function fetchNotes() {
      const headersObj = new Headers({
        Authorization: `Token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3.raw",
        "If-None-Match": eTag,
      });
      console.log(headersObj.get("If-None-Match"));
      const data = await fetch(
        `https://api.github.com/repos/fireb1003/noterepo-repo/contents`,
        {
          headers: headersObj,
          //cache: "no-cache",
        }
      );
      setETag(data.headers.get("ETag"));
      if (data.status === 200) {
        const notes = (await data.json()) as any[];
        setNotes(notes);
      }
    }
    console.log("fetchNotes fetchyCount:", fetchyCount);
    fetchNotes();
  }, [fetchyCount, eTag, onFileDeleted]);

  const refetch = () => setFetchyCount(1 + fetchyCount);
  return (
    <>
      {notes &&
        Array.isArray(notes) &&
        notes.map((singleNote) => (
          <h2
            key={singleNote.name}
            className="text-2xl"
            onClick={() => onSelectNote(singleNote)}
          >
            {singleNote.name.replace(".md", "")}
          </h2>
        ))}
      <hr />
      <AddNote onAddNote={refetch} />
    </>
  );
}
