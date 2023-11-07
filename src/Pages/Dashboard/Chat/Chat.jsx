/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  ChatContainer,
  MessageList,
  Message,
  ConversationHeader,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";

import { fetchUserMessageHistory } from "../Api/Methods";
import { convertMessageFormat } from "../DashboardHelpers";

const Chat = ({ chattingWith, currentUser }) => {
  const [messageHistory, setMessageHistory] = useState([]);

  const getMessageHistory = async () => {
    const response = await fetchUserMessageHistory(
      currentUser.id,
      chattingWith.id
    );

    const apiMessages = response.data;

    const chatMessages = convertMessageFormat(
      apiMessages,
      currentUser,
      chattingWith
    );

    setMessageHistory(chatMessages);
  };

  useEffect(() => {
    getMessageHistory();
  }, [chattingWith]);

  return (
    <ChatContainer>
      <ConversationHeader className="mb-2">
        <ConversationHeader.Content userName={chattingWith.username} />
      </ConversationHeader>
      <MessageList>
        {messageHistory.length !== 0 ? (
          messageHistory.map((message) => (
            <Message key={message.id} model={{ ...message }} />
          ))
        ) : (
          <MessageList.Content className="items-center flex justify-center w-full my-2">
            <div className="btn btn-active btn-ghost btn-wide">Say Hi!</div>
          </MessageList.Content>
        )}
      </MessageList>
      <MessageInput attachButton={false} placeholder="Type message here" />
    </ChatContainer>
  );
};

export default Chat;
