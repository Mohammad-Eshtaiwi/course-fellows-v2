export function getCurrentVideoId(k: number, map: Record<number, string>) {
  const entries = Object.entries(map);

  const result = entries.reduce((current, [key, value], index) => {
    if (current) return current;
    if (k === 0) return value;
    const newKey = entries[index + 1] ? entries[index + 1][0] : null;
    if (!newKey) return value;
    if (Number(key) <= k && Number(newKey) > k) {
      return value;
    }
    return "";
  }, "");

  return result;
}
