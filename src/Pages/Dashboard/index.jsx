import { MainContainer, Sidebar } from "@chatscope/chat-ui-kit-react";

import Navbar from "../../Shared/Components/Navbar";

import Chat from "./Chat/Chat";
import Conversations from "./Conversations/Conversations";

const Dashboard = () => {
  return (
    <div className="relative pr-[1px] h-full">
      <Navbar />
      <MainContainer className="h-screen min-h-[700px]">
        <Sidebar position="left" scrollable={false}>
          <div className="flex justify-center items-center bg-slate-200 h-20">
            <p>Username</p>
          </div>
          <Conversations />
        </Sidebar>
        <Chat />
      </MainContainer>
    </div>
  );
};

export default Dashboard;
