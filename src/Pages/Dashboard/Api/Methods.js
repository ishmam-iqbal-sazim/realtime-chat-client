import { getRequest, postRequest } from "../../../Config/Axios/AxiosConfig";

export const fetchAllUsers = async () => {
  return await getRequest("users");
};

export const fetchUserMessageHistory = async (receiverId) => {
  return await getRequest(`messages?chatting_with=${receiverId}`);
};

export const sendMessage = async (message) => {
  return await postRequest("messages", message);
};
