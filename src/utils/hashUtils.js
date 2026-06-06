/**
 * Fast, non-cryptographic hash (FNV-1a 32-bit)
 * Returns a positive hex string for use as a key.
 */
export function hashKeyFNV32(str) {
  let hash = 0x811c9dc5; // Offset basis
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    // Multiply by FNV prime (0x01000193)
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return (hash >>> 0).toString(16);
}
