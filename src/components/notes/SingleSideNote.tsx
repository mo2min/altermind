import React, { useState } from "react";
import { TreeNote } from "../../utils/types/notes";
interface Props {
  note: TreeNote;
  selectNote: any;
}

export default function SingleSideNote({ note, selectNote }: Props) {
  const [editable, setEditable] = useState(false);
  const [changedText, setChangedText] = useState("");
  const edRef = React.useRef(null);
  return (
    <>
      <h2
        className="text-xl"
        contentEditable={editable}
        ref={edRef}
        suppressContentEditableWarning={true}
        onInput={(e: React.SyntheticEvent) => {
          //console.log(e.currentTarget.textContent);
          setChangedText("" + e.currentTarget.textContent);
        }}
        onKeyDown={(e: React.KeyboardEvent<any>) => {
          if (e.keyCode === 13) {
            e.preventDefault();
            console.log(changedText);
            // Now Rename File by delete then recrate with same content
          }
        }}
        onClick={() => selectNote(note)}
      >
        {note.name.replace(".md", "")}
      </h2>{" "}
      <span
        onClick={() => {
          setEditable(true);
          (edRef.current as any).focus();
        }}
      >
        [Rn]
      </span>
    </>
  );
}
