import { Conversation, ConversationList } from "@chatscope/chat-ui-kit-react";

const Conversations = () => {
  return (
    <ConversationList>
      <Conversation name="Person 1"></Conversation>
      <Conversation name="Person 2"></Conversation>
      <Conversation name="Person 3"></Conversation>
    </ConversationList>
  );
};

export default Conversations;
