function simpleMap(props, wrap) {
  const list = props.each || [props.fallback],
    len = list.length,
    fn = props.children;
  let mapped = Array(len);
  for (let i = 0; i < len; i++) mapped[i] = wrap(fn, list[i], i);
  return mapped;
}

export function DoFor(props) {
  return simpleMap(props, (fn, item, i) => fn(item, () => i));
}
