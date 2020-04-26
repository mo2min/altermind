import React, { useState, useEffect } from "react";
import {
  Editor,
  EditorState,
  CompositeDecorator,
  convertToRaw,
} from "draft-js";
import { getStateFromMd } from "../utils/StateFromMd";
import DraftLink from "../utils/draft/DraftLink";
import { draftToMarkdown } from "markdown-draft-js";
import { TreeNote } from "../utils/types/notes";
import { base64Encode, base64Decode } from "../utils/functions";
/*
// @ts-ignore
import draftToMarkdown from "draftjs-to-markdown";
*/
interface LocalProps {
  note: TreeNote;
  onSave: () => any;
  onDelete: () => any;
}
// Use props to listen to changes
export default function DraftEditor({ note, onSave, onDelete }: LocalProps) {
  let [editNote, setEditNote] = useState(note as TreeNote);
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

  useEffect(() => {
    // Only once (when select)
    setEditNote(note);
  }, [note]);

  useEffect(() => {
    // Edit note Changes
    const decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: DraftLink,
      },
    ]);
    setEditorState(
      EditorState.createWithContent(
        getStateFromMd("" + editNote.content),
        decorator
      )
    );
  }, [editNote]);

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
            console.log(editNote);
            // first option
            /*
            console.log(
              draftToMarkdown(
                convertToRaw(editorState.getCurrentContent()),
                {},
                null,
                {}
              )
            );
            */
            // second option
            console.log(
              draftToMarkdown(convertToRaw(editorState.getCurrentContent()))
            );
          }}
          className="m-2 px-2 py-1 rounded-lg text-green-800 text-xl font-light uppercase shadow-md hover:shadow-lg"
        >
          Log
        </button>

        <button
          onClick={async () => {
            const encodedContent = base64Encode(
              draftToMarkdown(convertToRaw(editorState.getCurrentContent()))
            );
            let data = await fetch(editNote.url, {
              headers: {
                Authorization: `Token ${process.env.REACT_APP_GITHUB_TOKEN}`, // YA Stupid
                // Accept: "application/vnd.github.v3.raw",
              },
              method: "PUT",
              body: JSON.stringify({
                message: "Set file Content",
                sha: editNote.sha,
                content: encodedContent,
              }),
            });
            // TODO SetState from here for Better Flow
            if (!data.ok) {
              let { message } = await data.json();
              console.error(message);
            } else {
              console.log(await data.clone().json());
              let { content } = await data.json();
              setEditNote({
                ...editNote,
                content: base64Decode(encodedContent),
                sha: content.sha,
              });
            }
            onSave();
          }}
          className="m-2 px-2 py-1 rounded-lg bg-green-400 text-green-800 text-xl font-light uppercase shadow-md hover:shadow-lg"
        >
          Save
        </button>

        <button
          onClick={async () => {
            await fetch(editNote.url, {
              headers: {
                Authorization: `Token ${process.env.REACT_APP_GITHUB_TOKEN}`, // YA Stupid
                Accept: "application/vnd.github.v3.raw",
              },
              method: "DELETE",
              body: JSON.stringify({
                message: "Delete file",
                sha: editNote.sha,
              }),
            });
            onDelete();
          }}
          className="m-2 px-2 py-1 rounded-lg bg-red-400 text-green-800 text-xl font-light uppercase shadow-md hover:shadow-lg"
        >
          Delete
        </button>
        <div>
          <pre>{editNote.content}</pre>
        </div>
      </div>
    </div>
  );
}
