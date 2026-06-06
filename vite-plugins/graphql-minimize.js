import fs from "node:fs/promises";

export default function grapqlMinimizer() {
  return {
    name: "graphql-minimizer",
    async load(id) {
      if (id.endsWith(".graphql")) {
        const content = await fs.readFile(id, { encoding: "utf-8" });
        const formatted = minify(content);
        const lines = [];

        let mode = "root";
        let string = "";
        for (const c of formatted) {
          // Scope starts
          if (c === "(" || c === "{") {
            // Scope can be sorted because its inside { or (
            if (Array.isArray(lines.at(-1))) lines.at(-1).push(string + c);
            else lines.push(string + c);
            lines.push([]);
            string = "";
            mode = c;
          }
          // Separator was hit, break line, NOTE: we don't break [, because we don't want to sort that scope
          else if (
            (mode === "(" && (c === "," || c === " " || (c === "$" && !string.endsWith(":")))) ||
            (mode === "{" && (c === "," || c === " ") && string !== "...on")) {
            if (Array.isArray(lines.at(-1))) lines.at(-1).push(string);
            else lines.push(string);
            // Inside "(" scope variables can be written as $page:Int$id:5 -> this handle that
            if (c === "$") string = "$";
            else string = "";
          }
          // Scope closed
          else if ((mode === "(" && c === ")") || (mode === "{" && c === "}")) {
            let separator = c === "}" ? " " : ",";
            lines.at(-1).push(string);
            if (Array.isArray(lines.at(-2))) {
              lines[lines.length - 2].push(join(lines.pop().sort(), separator) + c);
              lines.at(-1)[lines.at(-1).length - 2] += lines.at(-1).pop();
            } else {
              lines[lines.length - 2] += join(lines.pop().sort(), separator) + c;
            }
            mode = parentScopeMode(lines);
            if (c !== ")") string = "";
            else if (Array.isArray(lines.at(-1))) string = lines.at(-1).pop();
            else string = lines.pop();
          }
          // Add character to string
          else {
            // Update mode, so we don't split "," characters inside this scope
            if (c === "[") mode = c;
            else if (c === "]") mode = parentScopeMode(lines);
            string += c;
          }
        }

        return `export default ${JSON.stringify(lines.sort().join("")).replaceAll(",$", "$")};`;
      }
    }
  }
}

// Custom join, that doesn't join empty ('') strings and doesn't add empty space when not needed
function join(array, separator) {
  let string = "";
  for (const val of array) {
    if (!val) continue;
    else if (!string.length) string = val;
    else if (string.at(-1) === "]" || string.at(-1) === "}" || string.at(-1) === ")") string += val;
    else string += separator + val;
  }

  return string;
}

function parentScopeMode(lines) {
  for (let i = lines.length - 1; i >= 0; i--) {
    const row = lines[i];
    const char = Array.isArray(row) ? row.at(-1)?.at(-1) : row?.at(-1);
    if (char === "(" || char === "{" || char === "[") return char;
  }

  return "root"
}

function minify(string) {
  const whitespaceAroundChar = /[\s,]*([{}=$():,[\]])\s?/g;
  return string
    .replace(/\s+/g, " ")
    .replace(whitespaceAroundChar, "$1")
    .replaceAll(". ", ".");
}
