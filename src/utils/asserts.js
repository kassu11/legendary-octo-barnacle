export const assertTrue = (condition, message = "Assertion was not true") => {
  if (!condition) {
    throw new Error(message);
  }
}

export const assertFalse = (condition, message = "Assertion was not false") => assertTrue(!condition, message);
