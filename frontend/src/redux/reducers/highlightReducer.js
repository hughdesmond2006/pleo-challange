const defaultState = {
  highlightedField: "none"
};

const highlightReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "HIGHLIGHT_FIELD": {
      state = {
        ...state,
        highlightedField: action.payload
      };
      break;
    }
    default:
      break;
  }

  return state;
};

export default highlightReducer;