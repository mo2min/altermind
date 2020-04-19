import React, { useState, useEffect } from "react";
import { Editor, EditorState, CompositeDecorator } from "draft-js";
import { getStateFromMd } from "../utils/StateFromMd";
import DraftLink from "../utils/draft/DraftLink";
export default function MdEditor({ note, onDelete }: any) {
  let [editorState, setEditorState] = useState(EditorState.createEmpty());

  function findLinkEntities(
    contentBlock: any,
    callback: any,
    contentState: any
  ) {
    contentBlock.findEntityRanges((character: any) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === "LINK"
      );
    }, callback);
  }

  const editorRef = React.useRef(null);

  /*
  const [editorRef, setEditorRef] = React.useState(React.createRef<Editorr>());
  const setDomEditorRef = (ref: any) => {
    setEditorRef(ref);
  };
  */

  useEffect(() => {
    const decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: DraftLink,
      },
    ]);
    setEditorState(
      EditorState.createWithContent(
        getStateFromMd("" + note.content),
        decorator
      )
    );
  }, [note]);

  return (
    <div>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        ref={editorRef}
      />
      <div>
        <button
          onClick={() => {
            const currHtml = (editorRef.current as any).editor.innerHTML;
            console.log(currHtml);
          }}
          className="px-2 py-1 rounded-lg bg-green-400 text-green-800 text-xl font-light uppercase shadow-md hover:shadow-lg"
        >
          Save
        </button>

        <button
          onClick={async () => {
            console.log(note);

            await fetch(note.url, {
              headers: {
                Authorization: `Token ${process.env.REACT_APP_GITHUB_TOKEN}`, // YA Stupid
                Accept: "application/vnd.github.v3.raw",
              },
              method: "DELETE",
              body: JSON.stringify({
                message: "Delete file",
                sha: note.sha,
              }),
            });
            onDelete();
          }}
          className="px-2 py-1 rounded-lg bg-red-400 text-green-800 text-xl font-light uppercase shadow-md hover:shadow-lg"
        >
          Delete
        </button>
        <div>
          <pre>{note.content}</pre>
        </div>
      </div>
    </div>
  );
}
