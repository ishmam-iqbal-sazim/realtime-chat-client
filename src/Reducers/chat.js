const initialState = {
  user: null,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_CHAT_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "CLEAR_CHAT_USER":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default chatReducer;
