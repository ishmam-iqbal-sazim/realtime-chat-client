import {
  ChatContainer,
  MessageList,
  Message,
  ConversationHeader,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";

const Chat = () => {
  return (
    <ChatContainer>
      <ConversationHeader className="mb-2">
        <ConversationHeader.Content userName="Person 4" />
      </ConversationHeader>
      <MessageList>
        <Message
          model={{
            message: "Hello",
            sender: "Zoe",
            direction: "incoming",
            position: "single",
          }}
        />
        <Message
          model={{
            message: "Hi",
            direction: "outgoing",
            position: "single",
          }}
        />
      </MessageList>
      <MessageInput attachButton={false} placeholder="Type message here" />
    </ChatContainer>
  );
};

export default Chat;
