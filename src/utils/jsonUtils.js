export function safeParseJson(string, defaultValue) {
  try {
    return JSON.parse(string) || defaultValue;
  } catch {
    return defaultValue;
  }
}

export function safeStringifyJson(string, defaultValue) {
  try {
    return JSON.stringify(string) || defaultValue;
  } catch {
    return defaultValue;
  }
}
