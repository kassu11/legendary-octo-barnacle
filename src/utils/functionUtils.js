export const isTypeFunction = value => typeof value === "function";
export const unwrapFunction = value => isTypeFunction(value) ? value() : value;
