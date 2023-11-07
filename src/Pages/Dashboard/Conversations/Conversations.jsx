import { Conversation, ConversationList } from "@chatscope/chat-ui-kit-react";
import { useDispatch } from "react-redux";

import { changeChatUser } from "../../../Actions/chat";

const Conversations = ({ users }) => {
  const dispatch = useDispatch();

  const handleClick = (user) => {
    dispatch(changeChatUser(user));
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
