import { useState } from "react";
import { useDispatch } from "react-redux";
import { Conversation, ConversationList } from "@chatscope/chat-ui-kit-react";

import { changeChatUser, setMessages } from "../../../../Stores/Actions/chat";
import { fetchUserMessageHistory } from "../../Api/DashboardMethods";
import { convertApiMessagesToChatMessages } from "../../DashboardHelpers";

const Conversations = ({ currentUser, users }) => {
  const dispatch = useDispatch();

  const [activeChat, setActiveChat] = useState(null);

  const handleClick = async (user) => {
    await getMessageHistory(user);
    setActiveChat(user.id);
    dispatch(changeChatUser(user));
  };

  const getMessageHistory = async (user) => {
    const response = await fetchUserMessageHistory(user.id);

    const apiMessages = response.data;

    const chatMessages = convertApiMessagesToChatMessages(
      apiMessages,
      currentUser,
      user
    );

    dispatch(setMessages([...chatMessages]));
  };

  return (
    <>
      {users.length !== 0 ? (
        <ConversationList>
          {users.map((user) => (
            <Conversation
              name={user.username}
              key={user.id}
              onClick={() => handleClick(user)}
              className={`${activeChat === user.id ? "bg-slate-200" : ""} my-2`}
            />
          ))}
        </ConversationList>
      ) : (
        <div>No users found</div>
      )}
    </>
  );
};

export default Conversations;
