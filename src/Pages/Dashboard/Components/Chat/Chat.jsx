/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ChatContainer,
  MessageList,
  Message,
  ConversationHeader,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import ActionCable from "actioncable";

import { setMessages } from "../../../../Stores/Actions/chat";
import { sendMessage } from "../../Api/DashboardMethods";
import { convertApiMessageToChatMessage } from "../../DashboardHelpers";

const Chat = ({ chattingWith, currentUser }) => {
  const messages = useSelector((state) => state.chat.messages);
  const dispatch = useDispatch();

  const cable = ActionCable.createConsumer(
    "ws://localhost:3000/api/v1/cable_socket"
  );

  const [newMessage, setNewMessage] = useState({});

  const handleSend = async (message) => {
    const response = await sendMessage({
      content: message,
      sender_id: currentUser.id,
      receiver_id: chattingWith.id,
    });
  };

  useEffect(() => {
    const subscription = cable.subscriptions.create(
      {
        channel: "ChatChannel",
        sender_id: currentUser.id,
        receiver_id: chattingWith.id,
      },
      {
        received: (data) => {
          const apiMessage = data;
          const newMessage = convertApiMessageToChatMessage(
            apiMessage,
            currentUser,
            chattingWith
          );

          setNewMessage(newMessage);
        },
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [chattingWith]);

  useEffect(() => {
    if (newMessage.id) {
      dispatch(setMessages([...messages, newMessage]));
    }
  }, [newMessage]);

  return (
    <ChatContainer>
      <ConversationHeader className="mb-2">
        <ConversationHeader.Content userName={chattingWith.username} />
      </ConversationHeader>
      <MessageList>
        {messages.length !== 0 ? (
          messages.map((message) => {
            if (
              (message.receiver_id === chattingWith.id &&
                message.sender_id === currentUser.id) ||
              (message.receiver_id === currentUser.id &&
                message.sender_id === chattingWith.id)
            ) {
              return (
                <Message key={message.id} model={{ ...message }}>
                  <Message.Header sender={message.sender} />
                </Message>
              );
            }
            return null;
          })
        ) : (
          <MessageList.Content className="items-center flex justify-center w-full my-2">
            <div
              className="btn btn-neutral btn-outline btn-wide"
              onClick={() => handleSend("Hi!")}
            >
              Say Hi!
            </div>
          </MessageList.Content>
        )}
      </MessageList>
      <MessageInput
        attachButton={false}
        placeholder="Type message here"
        onSend={(message) => handleSend(message)}
        data-testid="message-input-box"
      />
    </ChatContainer>
  );
};

export default Chat;
