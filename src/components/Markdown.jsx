import { marked } from "marked";
import DOMPurify from 'dompurify';

export function Markdown(props) {
  const dirty = marked.parse(props.children)
  const clean = DOMPurify.sanitize(dirty);
  const elem = <div innerHTML={clean}></div>; 
  return <For each={elem.childNodes}>{e => e}</For>
}
