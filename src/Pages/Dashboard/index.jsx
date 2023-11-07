import { MainContainer, Sidebar } from "@chatscope/chat-ui-kit-react";
import { useSelector } from "react-redux";

import Navbar from "../../Shared/Components/Navbar";

import Chat from "./Chat/Chat";
import Conversations from "./Conversations/Conversations";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="relative pr-[1px] h-full">
      <Navbar />
      <MainContainer className="h-screen min-h-[700px]">
        <Sidebar position="left" scrollable={false}>
          <div className="flex justify-center items-center bg-slate-200 h-20">
            <p>{user.username}</p>
          </div>
          <Conversations id={user.id} />
        </Sidebar>
        <Chat />
      </MainContainer>
    </div>
  );
};

export default Dashboard;
