# CSS Styling Guide

This guide outlines the CSS class naming system used in the project.
All CSS classes fall into one of five categories, and each class must belong to
only one category.

All class names must be written in **kebab-case**.

---

## Class Categories
As stated above, classes are organized into four categories:

1. Page classes
2. Component classes
3. Utility classes
4. State classes
5. Generic classes

---

### Page Classes (High-level)
As the name implies, page classes should only be used within a single page.
They are **high-level classes** and can be applied without nesting or modifier
classes.

- All page classes start with the prefix: `.pg-{page-name}`
- Page classes are useful when you need to adjust component behavior or apply
page-specific styling.

---

### Component Classes (Scoped to individual components)
Component classes should only be used inside a single `.jsx` file, with their
styles defined in the component’s corresponding `.scss` file.

- Components can be reused throughout the codebase, but **do not define
component classes outside of the component’s style file**. If you do, the class
is no longer considered a component class but a utility class.
- You may modify component class styles outside their own style file, but in
that case the class must be **nested inside a high-level class**.
- All component classes start with the prefix: `.cp-{component-description}`
- Example usage: creating reusable UI elements such as buttons or cards.

---

### Utility Classes (Global helpers in `index.scss`)
Utility classes are defined globally in the `index.scss` file.

- They can also be modified elsewhere, but they must always be **nested inside
a high-level class**.
- Utility classes do not use any prefix.
- Example: `.grid-column-auto-fill`

---

### State Classes (No standalone styling)
State classes should never have default styling applied to them directly.

- They must always be used in combination with another class (nested or as a
modifier).
- Styling for state classes can be placed anywhere, and they can be used as the
first level of nesting.
- However, they are **not high-level classes** and must not include default
styling.

**Example:**
```css
.cp-media-button.loading {
 opacity: 0.5;
}
```

---

### Generic Classes (No standalone styling)

Generic classes are **structural helpers** that should always be nested inside
high-level classes. They may be placed in any `.scss` file.

- No prefix is used.
- Typically simple, descriptive names.
- Examples: `.wrapper`, `.footer`, `.item`
