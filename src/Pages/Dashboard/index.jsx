import { MainContainer, Sidebar } from "@chatscope/chat-ui-kit-react";
import Chat from "./Chat/Chat";
import Conversations from "./Conversations/Conversations";

const Dashboard = () => {
  return (
    <div className="relative m-2">
      <MainContainer className="h-[630px]">
        <Sidebar position="left" scrollable={false}>
          <Conversations />
        </Sidebar>
        <Chat />
      </MainContainer>
    </div>
  );
};

export default Dashboard;
