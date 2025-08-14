import { createSignal } from "solid-js";

export const localStorageString = (key, initialValue) => {
  const [value, _setValue] = createSignal(localStorage.getItem(key) ?? initialValue);
  const setValue = val => {
    _setValue(v => {
      const value = typeof val === "function" ? val(v) : val;
      if (value == null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }

      return value;
    });
  }

  return [value, setValue];
}

const parseBoolean = str => {
  if (str === "true") {
    return true;
  }

  if (str === "false") {
    return false;
  }
}

export const localStorageBoolean = (key, initialValue) => {
  const [value, _setValue] = createSignal(parseBoolean(localStorage.getItem(key)) ?? initialValue);
  const setValue = val => {
    _setValue(v => {
      const value = typeof val === "function" ? val(v) : val;
      if (value == null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, String(value));
      }

      return value;
    });
  }

  return [value, setValue];
}

const parseJson = (str) => {
  try {
    return JSON.parse(str);
  } catch (e) {
  }
}

export const localStorageJSON = (key, initialValue) => {
  const [value, _setValue] = createSignal(parseJson(localStorage.getItem(key)) ?? initialValue);
  const setValue = val => {
    _setValue(v => {
      const value = typeof val === "function" ? val(v) : val;
      if (value == null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }

      return value;
    });
  }

  return [value, setValue];
}
