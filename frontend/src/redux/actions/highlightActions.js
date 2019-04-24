export function highlightField(fieldName) {
  return {
    type: "HIGHLIGHT_FIELD",
    payload: fieldName
  };
}