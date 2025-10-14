import { marked } from "marked";
import DOMPurify from 'dompurify';
import style from "./Markdown.module.scss";
import { createMemo, createRenderEffect, createSignal } from "solid-js";

const spoilerExtension = {
  name: "spoiler",
  level: "inline",
  start(src) {
    return src.match(/~!/)?.index;
  },
  tokenizer(src) {
    const match = /^~!([^!~]+)!~/.exec(src);
    if (match) {
      return {
        type: "spoiler",
        raw: match[0],
        text: match[1]
      };
    }
  },
  renderer(token) {
    return `<details class="${style.spoiler}"><summary><span class="${style.text}">${marked.parseInline(token.text)}</span></summary></details>`;
  }
};


marked.use({ extensions: [spoilerExtension] });

export function OldMarkdownComponent(props) {
  if (!props.children) return null;
  const dirty = marked(props.children)
  const clean = DOMPurify.sanitize(dirty);
  const elem = <div innerHTML={clean}></div>; 
  return <For each={elem.childNodes}>{e => e}</For>
}
const singleLineBreakCharacterRegex = /([^\n])\n([^\n])/g;
const replaceSingleLineBreakWithBrElement = (_, p1, p2) => p1 + "<br>" + p2;
export function Markdown(props) {
  const children = createMemo(() => {
    if (!props.text) {
      return [];
    }
    const dirty = marked(props.text.replace(singleLineBreakCharacterRegex, replaceSingleLineBreakWithBrElement));
    const clean = DOMPurify.sanitize(dirty);
    const elem = <div innerHTML={clean}></div>;
    return [...elem.childNodes];
  });

  return <For each={children()}>{e => e}</For>
}
