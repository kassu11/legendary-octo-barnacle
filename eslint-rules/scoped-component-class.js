// Prop scoped components (<MediaCard scoped />) must be given the components own root class,
// which is the component name in kebab-case (MediaCard -> media-card).
// This keeps every class used in a .scoped.css file searchable inside the matching .jsx file.
//
// Caller:    <MediaCard scoped class="media-card" />  (extra classes are allowed: class="loader-circle refresh")
// Component: the element receiving the scoping props (native element or scoped component) must have the same class itself.

const kebabCase = name => name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([A-Z])([A-Z][a-z])/g, "$1-$2").toLowerCase();
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
      missingCallerClass: "Scoped <{{name}}> needs class=\"{{className}}\".",
      missingComponentClass: "<{{tag}}> receives the scoping props of {{name}}, so it needs the class \"{{className}}\".",
    },
  },
  create(context) {
    const ignore = new Set(context.options[0]?.ignore ?? []);

    // Scope stack of the components we are inside of: { name, scopingNames }
    const components = [];

    return {
      // Caller side
      JSXOpeningElement(node) {
        if (node.name.type !== "JSXIdentifier") return;
        const name = node.name.name;
        if (!isComponentName(name) || ignore.has(name)) return;
        if (!hasAttribute(node, "scoped")) return;

        const className = kebabCase(name);
        if (!staticClasses(node).has(className)) {
          context.report({ node, messageId: "missingCallerClass", data: { name, className } });
        }
      },

      // Component side
      ":function"(node) {
        const name = functionName(node);
        if (name && isComponentName(name) && !ignore.has(name)) {
          const param = node.params[0];
          components.push({ node, name, scopingNames: new Set(param?.type === "Identifier" ? [param.name] : []) });
        }
      },
      ":function:exit"(node) {
        if (components.at(-1)?.node === node) components.pop();
      },
      // const [local, scoping] = splitProps(props, [...]) -> "scoping" holds the scoping props
      VariableDeclarator(node) {
        const component = components.at(-1);
        if (!component) return;
        if (node.id.type !== "ArrayPattern" || node.init?.type !== "CallExpression") return;
        if (node.init.callee.name !== "splitProps") return;
        const [source] = node.init.arguments;
        if (source?.type !== "Identifier" || !component.scopingNames.has(source.name)) return;

        const rest = node.id.elements[node.init.arguments.length - 1];
        if (rest?.type === "Identifier") component.scopingNames.add(rest.name);
        component.scopingNames.delete(source.name);
      },
      JSXSpreadAttribute(node) {
        const component = components.at(-1);
        if (!component) return;
        if (node.argument.type !== "Identifier" || !component.scopingNames.has(node.argument.name)) return;

        const element = node.parent;
        // Props forwarded to a non scoped component are data, the receiving component is checked on its own
        if (element.name.type === "JSXIdentifier" && isComponentName(element.name.name) && !hasAttribute(element, "scoped")) return;

        const className = kebabCase(component.name);
        if (!staticClasses(element).has(className)) {
          const tag = element.name.type === "JSXIdentifier" ? element.name.name : "element";
          context.report({ node: element, messageId: "missingComponentClass", data: { tag, name: component.name, className } });
        }
      },
    };
  },
};

function functionName(node) {
  if (node.id) return node.id.name;
  if (node.parent.type === "VariableDeclarator" && node.parent.id.type === "Identifier") return node.parent.id.name;
  return null;
}

function hasAttribute(element, name) {
  return element.attributes.some(attr => attr.type === "JSXAttribute" && attr.name.name === name);
}

// Collects every class name that is always applied, from class="" and classList={{ name: true }}
function staticClasses(element) {
  const classes = new Set();
  const addString = string => string.split(/\s+/).filter(Boolean).forEach(c => classes.add(c));

  for (const attr of element.attributes) {
    if (attr.type !== "JSXAttribute" || !attr.value) continue;
    const value = attr.value.type === "JSXExpressionContainer" ? attr.value.expression : attr.value;

    if (attr.name.name === "class") {
      collectStrings(value).forEach(addString);
    } else if (attr.name.name === "classList" && value.type === "ObjectExpression") {
      for (const prop of value.properties) {
        if (prop.type !== "Property" || prop.computed) continue;
        if (prop.value.type !== "Literal" || prop.value.value !== true) continue;
        addString(prop.key.type === "Identifier" ? prop.key.name : String(prop.key.value));
      }
    }
  }

  return classes;
}

// Static parts of "a", `a ${b}`, "a " + b
function collectStrings(node) {
  if (node.type === "Literal" && typeof node.value === "string") return [node.value];
  if (node.type === "TemplateLiteral") return node.quasis.map(q => q.value.cooked);
  if (node.type === "BinaryExpression" && node.operator === "+") return [...collectStrings(node.left), ...collectStrings(node.right)];
  return [];
}
