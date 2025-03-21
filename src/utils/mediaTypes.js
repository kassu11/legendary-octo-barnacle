export const binaryMediaType = type => {
  switch (type.toLowerCase()) {
    case "manga":
    case "novel":
      return "manga";
    case "anime":
    case "ova":
    case "ona":
      return "anime";
    default:
      console.error("Unknown media type", type);
      return type;
  }
}
