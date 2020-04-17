import marked from "marked";
import { convertFromHTML, ContentState } from "draft-js";

export function getStateFromMd(markdown: string): ContentState {
  const markedResults = marked(markdown);
  console.log(markedResults);
  const blocksFromHTML = convertFromHTML(markedResults);
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );
  return state;
}
