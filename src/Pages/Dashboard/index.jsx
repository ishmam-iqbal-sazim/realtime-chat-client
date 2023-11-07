/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MainContainer, Sidebar } from "@chatscope/chat-ui-kit-react";

import Navbar from "../../Shared/Components/Navbar";

import Chat from "./Chat/Chat";
import Conversations from "./Conversations/Conversations";

import { fetchAllUsers } from "./Api/Methods";

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  const currentUser = useSelector((state) => state.auth.user);
  const chattingWith = useSelector((state) => state.chat.user);

  const getAllUsers = async () => {
    const response = await fetchAllUsers();

    const allUsers = response.data;
    const filteredUsers = allUsers.filter((user) => user.id !== currentUser.id);

    setUsers(filteredUsers);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <main className="relative pr-[1px] h-full">
      <Navbar />
      <MainContainer className="h-screen min-h-[700px]">
        <Sidebar position="left" scrollable={false}>
          <div className="flex justify-center items-center bg-slate-200 h-20">
            <p className="uppercase">{currentUser.username}</p>
          </div>

          <Conversations users={users} />
        </Sidebar>

        {chattingWith ? (
          <Chat chattingWith={chattingWith} currentUser={currentUser} />
        ) : (
          <div className="w-full items-center flex justify-center">
            <div>Select someone to chat with</div>
          </div>
        )}
      </MainContainer>
    </main>
  );
};

export default Dashboard;
