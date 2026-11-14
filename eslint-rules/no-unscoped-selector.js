// "_" unscopes a selector in a .scoped.css file (_body, _.class), letting the styles reach elements of other components.
// Unscoping is a code smell (like !important), so every use has to be scoped or explicitly allowed with an eslint-disable comment.
//
// Unscoped user action pseudo classes (_:hover, :has(_:focus-visible)) are fine, the element can come from any component.

const userActionPseudoClasses = new Set(["hover", "active", "focus", "focus-visible", "focus-within"]);

/** @type {import("eslint").Rule.RuleModule} */
export default {
  meta: {
    type: "problem",
    schema: [],
    messages: {
      unscoped: "\"{{selector}}\" unscoping is a code smell, scope the selector if possible.",
    },
  },
  create(context) {
    return {
      Selector(node) {
        const children = Array.from(node.children);
        children.forEach((child, i) => {
          if (child.type !== "TypeSelector" || !child.name.startsWith("_")) return;

          const next = children[i + 1];
          if (child.name === "_" && next?.type === "PseudoClassSelector" && userActionPseudoClasses.has(next.name)) return;

          context.report({
            node: child,
            messageId: "unscoped",
            data: { selector: context.sourceCode.getText(child) + (child.name === "_" && next ? context.sourceCode.getText(next) : "") },
          });
        });
      },
    };
  },
};
