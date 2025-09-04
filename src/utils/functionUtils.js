const isFunction = value => typeof value === "function";
export const unwrapFunction = value => isFunction(value) ? value() : value;
