import { ContentState, convertFromRaw } from "draft-js";
import { markdownToDraft } from "markdown-draft-js";

export function getStateFromMd(markdown: string): ContentState {
  /*
  const markedResults = marked(markdown);
  console.log(markedResults);
  const blocksFromHTML = convertFromHTML(markedResults); // Add new empty block
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );
  return state;
  */
  return convertFromRaw(markdownToDraft(markdown));
}
