# CSS Styling Guide

This guide outlines the CSS class naming system used in the project. All CSS
classes fall into one of four categories and must only belong to a single
category.

At the end there is also a exhaustive list of all the class names in use.

## File Organization

- If a class is used **only within a single component or page**, define it in
that component's `.jsx` stylesheet.
- If a class is reused **across multiple components/pages**, define it in
`index.scss`.

This approach makes it easier to understand the scope and impact of CSS
changes.

---

## Class Categories

### 1. Single-Use Descriptive Classes

These are fully styled classes used **only in one specific component or page**.

- **Location:** Component-specific `.scss` file
- **Purpose:** Styling unique elements
- **Examples:**
  - `.login-form-title`
  - `.dashboard-sidebar`
- **Usage:**
  ```html
  <h1 class="login-form-title">Welcome Back</h1>
  ```

### 2. Multi-Use Utility Classes
Reusable, fully styled utility classes with specific functions. These can be
used anywhere but must be defined only in `index.scss`.

- **Location:** `index.scss`
- **Purpose:** Reusable styles (e.g., spacing, typography, visibility)
- **Examples:**
  - `.font-500`
  - `.page-width-400`
  - `.visually-hidden`
- **Usage:**
  ```html
  <main class="page-width-400">
    <p class="font-500">This is styled text</p>
    <span class="visually-hidden">Screen reader only</span>
  </main>
  ```

### 3. Generic Decorator Classes
Structural or layout helper classes. These have no styles on their own and must
be used within a Category 1 class.

- **Location:** Component-specific `.scss` file or `index.scss`
- **Purpose:** Layout and structure, used only when nested inside Category 1 classes
- **Examples:**
  - `.container`
  - `.grid`
  - `.flex-wrap`
- **Usage:**
  ```html
  <div class="product-card">
    <div class="container">
      <div class="card">...</div>
    </div>
  </div>
  ```

### 4. Generic State Classes
State-indicating classes (e.g., active, open). These have no styles on their
own and are used in combination with other classes.

- **Location:** Component-specific `.scss` file or `index.scss`
- **Purpose:** Represent UI states like active, open, selected
- **Examples:**
  - `.active`
  - `.selected`
  - `.open`
- **Usage:**
  ```html
  <button class="button active">Save</button>
  <li class="menu-item selected">Dashboard</li>
  ```
  ```css
  .button.active {
    background-color: blue;
  }
  
  .menu-item.selected {
    font-weight: bold;
  }
  ```

---

## Exhaustive list of all classes

List of all the classes currently in use inside the project.

### 1. Single-Use Descriptive Classes

Not listing these, because they are by far the most used and should be obvious
by the file they are in.

### 2. Multi-Use Utility Classes

- .line-clamp
- .line-clamp-2
- .line-clamp-3
- .line-clamp-6
- .visually-hidden
- main#page-content

### 3. Generic Decorator Classes

- .banner
- .container
- .content
- .cover
- .form
- .header
- .input-grid

### 4. Generic State Classes

- .anime
- .loading
- .manga
- .selected


