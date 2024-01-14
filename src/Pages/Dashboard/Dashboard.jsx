/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ActionCable from "actioncable";
import { MainContainer, Sidebar } from "@chatscope/chat-ui-kit-react";

import Navbar from "../../Shared/Components/Navbar/Navbar";
import Chat from "./Components/Chat/Chat";
import Conversations from "./Components/Conversations/Conversations";
import { fetchAllUsers } from "./Api/DashboardMethods";

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  const currentUser = useSelector((state) => state.auth.user);
  const chattingWith = useSelector((state) => state.chat.chatUser);

  const getAllUsers = async () => {
    const response = await fetchAllUsers();

    const allUsers = response.data;
    const filteredUsers = allUsers.filter((user) => user.id !== currentUser.id);

    setUsers(filteredUsers);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  // const cable = ActionCable.createConsumer("ws://localhost:3000/cable_socket");

  // useEffect(() => {
  //   const subscription = cable.subscriptions.create(
  //     {
  //       channel: "AppearanceChannel",
  //     },
  //     {
  //       received: (data) => {
  //         setUsers((prevUsers) => {
  //           return [...prevUsers, data];
  //         });
  //       },
  //     }
  //   );

  //   return () => {
  //     subscription.unsubscribe();
  //   };
  // }, []);

  useEffect(() => {
    const newEventSource = new EventSource(
      `http://localhost:3000/api/v1/stream?id=${currentUser.id}`
    );

    newEventSource.onopen = () => {
      console.log("EventSource connection opened");
    };

    newEventSource.onerror = (error) => {
      console.error("EventSource error:", error);
    };

    newEventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.message) {
        console.log("EventSource message received:", data);
      }

      if (data.user) {
        const user = data.user;
        console.log(user);

        setUsers((prevUsers) => {
          return [...prevUsers, user];
        });
      }
    };

    return () => {
      newEventSource.close();
      console.log("EventSource connection closed");
    };
  }, []);

  return (
    <main className="relative pr-[1px] h-full">
      <Navbar />
      <MainContainer className="h-screen min-h-[700px]">
        <Sidebar position="left" scrollable={false}>
          <div className="flex justify-center items-center bg-slate-200 h-20">
            <p>{currentUser.username}</p>
          </div>

          <Conversations users={users} currentUser={currentUser} />
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
