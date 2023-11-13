import { getRequest, postRequest } from "../../../Config/Axios/AxiosConfig";

export const fetchAllUsers = async () => {
  return await getRequest("users");
};

export const fetchUserMessageHistory = async (senderId, receiverId) => {
  return await getRequest(
    `messages?current_user=${senderId}&chatting_with=${receiverId}`
  );
};

export const sendMessage = async (message) => {
  return await postRequest("messages", message);
};
