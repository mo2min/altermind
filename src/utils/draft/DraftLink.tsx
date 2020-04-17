import React from "react";

export default function DraftLink(props: any) {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <>
      <a href={url} className="text-blue-500">
        {decodeURIComponent(props.decoratedText)}
      </a>
      <a
        href={url}
        className="text-blue-500"
        contentEditable="false"
        suppressContentEditableWarning={true}
      >
        <span>{"🔗"}</span>
      </a>
      <span> </span>
    </>
  );
}
