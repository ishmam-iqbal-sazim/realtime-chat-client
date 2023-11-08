export const convertApiMessagesToChatMessages = (
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
        receiver: chattingWith.username,
        sender_id: currentUser.id,
        receiver_id: chattingWith.id,
        direction: "outgoing",
        position: "single",
      };
    } else {
      return {
        id: message.id,
        message: message.content,
        sender: chattingWith.username,
        receiver: currentUser.username,
        sender_id: chattingWith.id,
        receiver_id: currentUser.id,
        direction: "incoming",
        position: "single",
      };
    }
  });
};

export const convertApiMessageToChatMessage = (
  message,
  currentUser,
  chattingWith
) => {
  if (message.sender_id === currentUser.id) {
    return {
      id: message.id,
      message: message.content,
      sender: currentUser.username,
      receiver: chattingWith.username,
      sender_id: currentUser.id,
      receiver_id: chattingWith.id,
      direction: "outgoing",
      position: "single",
    };
  } else {
    return {
      id: message.id,
      message: message.content,
      sender: chattingWith.username,
      receiver: currentUser.username,
      sender_id: chattingWith.id,
      receiver_id: currentUser.id,
      direction: "incoming",
      position: "single",
    };
  }
};
