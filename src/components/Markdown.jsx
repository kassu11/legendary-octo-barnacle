import { marked } from "marked";
import DOMPurify from 'dompurify';
import style from "./Markdown.module.scss";

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

export function Markdown(props) {
  const dirty = marked(props.children)
  const clean = DOMPurify.sanitize(dirty);
  const elem = <div innerHTML={clean}></div>; 
  console.log(dirty);
  return <For each={elem.childNodes}>{e => e}</For>
}
