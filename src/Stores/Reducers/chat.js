const initialState = {
  messages: [],
  chatUser: null,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MESSAGES":
      return {
        ...state,
        messages: [...action.payload],
      };
    case "CHANGE_CHAT_USER":
      return {
        ...state,
        chatUser: action.payload,
      };
    case "CLEAR_CHAT_USER":
      return {
        ...state,
        chatUser: null,
      };
    default:
      return state;
  }
};

export default chatReducer;
