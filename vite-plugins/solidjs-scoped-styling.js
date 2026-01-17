import { createHash } from "crypto";

export default function solidJsScopedStyling() {
  return {
    name: "vite-solidjs-scoped-styling",
    transform,
  };
}

// Export for the testing script
export const transform = (src, id) => {
  if (id.endsWith(".scoped.jsx")) {
    const attribute = localDataAttributeFromFilePath(id);
    return src.replace(/(<[^>=+< /]+)/g, (_, tag) => `${tag} ${attribute}`);
  }
  else if (id.endsWith(".scoped.css")) {
    const attribute = "[" + localDataAttributeFromFilePath(id) + "]";

    let returnQuery = "";
    let isCommend = false;
    const attributeScope = [];
    const attributeScopeCharacters = {
      "\"": "\"",
      "'": "'",
      "[": "]",
    };

    const length = src.length;
    main: for (let start = 0; start < length; start++) {
      for (var end = start; end < length; end++) {
        // Positions is inside commend block
        // Early exit scoping
        if (isCommend) {
          if (src[end] === "/" && src[end - 1] === "*" && src[end - 2] !== "\\") {
            isCommend = false;
          }
        }
        // Position is either inside attribute or string inside attribute
        // Early exit scoping
        else if (attributeScope.length) {
          // Position ends either attribute or string inside attribute selector
          if (src[end - 1] !== "\\" && src[end] === attributeScopeCharacters[attributeScope.at(-1)]) {
            attributeScope.pop();
          }
          // Position is either nested attribute or string selector
          else if (src[end - 1] !== "\\" && src[end] in attributeScopeCharacters) {
            attributeScope.push(src[end]);
          }
        }
        // Positions starts a commend block
        else if (!isCommend && src[end - 1] !== "\\" && src[end] === "/" && src[end + 1] === "*") {
          isCommend = true;
        }
        // Position starts either attribute or string selector
        else if (src[end - 1] !== "\\" && src[end] in attributeScopeCharacters) {
          attributeScope.push(src[end]);
        }
        // Position is the new best selector start index
        else if ((src[end] === ";" || src[end] === "}") && src[end - 1] !== "\\") {
          returnQuery += src.substring(start, end + 1);
          start = end + 1;
        }
        // Position ends selector scope
        else if (src[end] === "{" && src[end - 1] !== "\\") {
          break;
        }
      }

      // End index should always be "{" character position
      // If the end index is same as length we can't possibly have a valid file ending because "}" is missing
      // Don't scope and just add the rest of the file as is
      if (end === length) {
        returnQuery += src.substring(start, end);
        break;
      }

      // Move starting index to first non whitespace character
      for (let i = start; i < end; i++) {
        if (src[i] !== " " && src[i] !== "\n" && src[i] !== "\r") {
          returnQuery += src.substring(start, i);
          start = i;
          break;
        }
      }

      // Selector is @media or @container early exit scoping
      if (src[start] === "@") {
        returnQuery += src.substring(start, end + 1);
        start = end;
        continue main;
      }


      let scopeCurrentSelector = true;
      let hasSelector = false;
      let noScopingInsidePseudoSelector = false;
      let isPseudoClass = false;
      const pseudoSelectorScope = [];

      for (let i = start; i < end; i++) {
        // Positions is inside commend block
        // Early exit scoping
        if (isCommend) {
          if (src[i] === "/" && src[i - 1] === "*" && src[i - 2] !== "\\") {
            isCommend = false;
          }
          returnQuery += src[i];
        }
        // Position is either inside attribute or string inside attribute
        // Early exit scoping
        else if (attributeScope.length) {
          // Position ends either attribute or string inside attribute selector
          if (src[i - 1] !== "\\" && src[i] === attributeScopeCharacters[attributeScope.at(-1)]) {
            attributeScope.pop();
          }
          // Position is either nested attribute or string selector
          else if (src[i - 1] !== "\\" && src[i] in attributeScopeCharacters) {
            attributeScope.push(src[i]);
          }
          returnQuery += src[i];
        }
        // Position is inside pseudo class that should not be scoped early exit
        // We don't want :nth-child(3) to become: :nth-child(3[data-k-234234])
        else if (noScopingInsidePseudoSelector) {
          // Check if the pseudo class contains "of" keyword
          // You can now scope inside no scope pseudo selector
          // :nth-child(3 of div[data-k-234234])
          if (equalsBackwards("of ", src, i)) {
            noScopingInsidePseudoSelector = false;
            scopeCurrentSelector = true;
          }
          returnQuery += src[i];
        }
        // Positions starts a commend block
        else if (!isCommend && src[i - 1] !== "\\" && src[i] === "/" && src[i + 1] === "*") {
          isCommend = true;
          returnQuery += src[i];
        }
        // Position starts either attribute or string selector
        else if (src[i - 1] !== "\\" && src[i] in attributeScopeCharacters) {
          attributeScope.push(src[i]);
          returnQuery += src[i];
        }
        // Position char ends the current selector
        // Check if we want to scope the selector
        else if (src[i] === " " || src[i] === "," || src[i] === ")" || src[i] === "+" || src[i] === "~" || src[i] === ">" || src[i] === "\n" || src[i] === "\r") {
          if (scopeCurrentSelector && hasSelector) {
            returnQuery += attribute;
          }
          // If selector was already scoped before the pseudo selector no need to rescope the selector
          // This check will just make CSS file little smaller
          if (src[i] === ")") {
            const selectorAlreadyScoped = pseudoSelectorScope.pop();
            scopeCurrentSelector = selectorAlreadyScoped;
          } else {
            scopeCurrentSelector = true;
          }
          hasSelector = false;
          isPseudoClass = false;
          noScopingInsidePseudoSelector = false;
          returnQuery += src[i];
        }
        // No need to scope the current selector because the parent should handle the scoping
        else if (src[i] === "&") {
          scopeCurrentSelector = false
          isPseudoClass = false;
          noScopingInsidePseudoSelector = false;
          returnQuery += src[i];
        }
        // Selector contains pseudo selector with arguments
        // Scope the pseudo selectors insides if they need it
        else if (isPseudoClass && src[i] === "(") {
          pseudoSelectorScope.push(scopeCurrentSelector);
          // These pseudo classes don't take classes as input so don't scope them
          // We don't want :nth-child(3) to become: :nth-child(3[data-k-234234])
          // NOTE: nth-child can take selectors with the "of" keyword
          if (equalsBackwards("child(", src, i) || equalsBackwards("type(", src, i) || equalsBackwards(":dir(", src, i)) {
            noScopingInsidePseudoSelector = true;
            scopeCurrentSelector = false;
          }
          // Pseudo class that we want to scope could be :has, :where: :is, :not etc.
          else {
            scopeCurrentSelector = true
          }
          hasSelector = false;
          returnQuery += src[i];
        }
        // Position start normal pseudo selector or pseudo selector with arguments
        // args: :not(.class) no args: :hover
        else if (src[i] === ":") {
          // Don't scope :root, if there are any other pseudo selectors that you should not scope add them here
          if (equalsforwards(":root", src, i)) {
            scopeCurrentSelector = false;
          }
          else if (scopeCurrentSelector) {
            returnQuery += attribute;
          }
          scopeCurrentSelector = false;
          isPseudoClass = true;
          returnQuery += src[i];
        }
        // Selector is prefixed with "_" don't scope the selector
        else if (hasSelector === false && src[i] === "_") {
          scopeCurrentSelector = false;
        }
        // Position should have ".", "#", and rest of UTF-8 characters
        else {
          hasSelector = true;
          returnQuery += src[i];
        }
      }


      if (scopeCurrentSelector && hasSelector) {
        returnQuery += attribute;
      }
      returnQuery += "{"

      start = end;
    }

    return returnQuery;
  }
};

const equalsBackwards = (string, string2, index) => {
  return equalsforwards(string, string2, index - (string.length - 1));
}

const equalsforwards = (string, string2, index) => {
  for (let i = 0; i < string.length; i++) {
    if (string2[i + index] !== string[i]) {
      return false;
    }
  }

  return true;
}

const removeFileType = filePath => filePath.replace(/\.[^.]+$/, "");

function hashString(filePath) {
  return createHash('sha256').update(filePath).digest('hex').substring(0, 8);
}

function localDataAttributeFromFilePath(filePath) {
  if (process.env.NODE_ENV !== "production") {
    // return "data-vite-dev-path=\"" + removeFileType(removeFileType(filePath)).split("/src/")[1] + "\"";
  }

  // First remove .jsx .tsx etc.
  // Then remove .scoped
  return "data-k-" + hashString(removeFileType(removeFileType(filePath)));
}
