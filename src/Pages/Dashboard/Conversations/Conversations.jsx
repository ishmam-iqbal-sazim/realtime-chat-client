import { Conversation, ConversationList } from "@chatscope/chat-ui-kit-react";

import { fetchAllUsers } from "../Api/Methods";
import { useEffect, useState } from "react";

const Conversations = ({ id }) => {
  const [users, setUsers] = useState([]);
  const getAllUsers = async () => {
    const response = await fetchAllUsers();
    const currentUsers = response.data;
    const filtered = currentUsers.filter((user) => user.id !== id);
    setUsers(filtered);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      {users.length !== 0 ? (
        <ConversationList>
          {users.map((user) => (
            <Conversation name={user.username} key={user.id}></Conversation>
          ))}
        </ConversationList>
      ) : (
        <div>...Loading</div>
      )}
    </>
  );
};

export default Conversations;
