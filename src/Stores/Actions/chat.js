export const changeChatUser = (user) => ({
  type: "CHANGE_CHAT_USER",
  payload: user,
});

export const clearChatUser = () => ({
  type: "CLEAR_CHAT_USER",
});

export const setMessages = (messages) => ({
  type: "SET_MESSAGES",
  payload: messages,
});
