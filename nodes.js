export function node(value, nextNode = null) {
  return {
    value,
    nextNode,
  };
}
