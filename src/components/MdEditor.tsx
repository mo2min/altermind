import React, { useState } from "react";
import { Editor, EditorState } from "draft-js";
export default function MdEditor({ content }: any) {
  let [editorState, setEditorState] = useState(EditorState.createEmpty());

  return (
    <div>
      <Editor editorState={editorState} onChange={setEditorState} />
      ---
      {content}
    </div>
  );
}
