// Prop scoped components (<MediaCard scoped />) must be given a class, any class name works.
// Scoping a component only makes sense when the parent's CSS has a selector to target it with.
//
// Caller: <MediaCard scoped class="card" />  (class={...} and classList={{...}} are fine too)

const isComponentName = name => /^[A-Z]/.test(name);

/** @type {import("eslint").Rule.RuleModule} */
export default {
  meta: {
    type: "suggestion",
    schema: [{
      type: "object",
      properties: {
        ignore: { type: "array", items: { type: "string" } },
      },
      additionalProperties: false,
    }],
    messages: {
      missingClass: "Scoped <{{name}}> needs a class for the parent's CSS to target it with.",
    },
  },
  create(context) {
    const ignore = new Set(context.options[0]?.ignore ?? []);

    return {
      JSXOpeningElement(node) {
        if (node.name.type !== "JSXIdentifier") return;
        const name = node.name.name;
        if (!isComponentName(name) || ignore.has(name)) return;
        if (!hasAttribute(node, "scoped")) return;

        if (!hasClass(node)) {
          context.report({ node, messageId: "missingClass", data: { name } });
        }
      },
    };
  },
};

function hasAttribute(element, name) {
  return element.attributes.some(attr => attr.type === "JSXAttribute" && attr.name.name === name);
}

// class="" with only whitespace or a valueless class attribute doesn't count as a class
function hasClass(element) {
  return element.attributes.some(attr => {
    if (attr.type !== "JSXAttribute" || !attr.value) return false;
    if (attr.name.name !== "class" && attr.name.name !== "classList") return false;
    const value = attr.value.type === "JSXExpressionContainer" ? attr.value.expression : attr.value;
    if (value.type === "Literal" && typeof value.value === "string") return value.value.trim() !== "";
    return true;
  });
}
