import React, { useState, useEffect } from "react";
import { Editor, EditorState, CompositeDecorator } from "draft-js";
import { getStateFromMd } from "../utils/StateFromMd";
import DraftLink from "../utils/draft/DraftLink";
export default function MdEditor({ content }: any) {
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

  useEffect(() => {
    const decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: DraftLink,
      },
    ]);
    setEditorState(
      EditorState.createWithContent(getStateFromMd("" + content), decorator)
    );
  }, [content]);

  return (
    <div>
      <Editor editorState={editorState} onChange={setEditorState} />
      <div>
        <button
          onClick={() => {
            console.log("Welcome ya Basha");
          }}
          className="px-2 py-1 rounded-lg bg-green-400 text-green-800 text-xl font-light uppercase shadow-md hover:shadow-lg"
        >
          Save
        </button>
        <div>
          <pre>{content}</pre>
        </div>
      </div>
    </div>
  );
}
