export const convertMessageFormat = (
  apiMessages,
  currentUser,
  chattingWith
) => {
  return apiMessages.map((message) => {
    if (message.sender_id === currentUser.id) {
      return {
        id: message.id,
        message: message.content,
        sender: currentUser.username,
        direction: "outgoing",
        position: "single",
      };
    } else {
      return {
        id: message.id,
        message: message.content,
        sender: chattingWith.username,
        direction: "incoming",
        position: "single",
      };
    }
  });
};
