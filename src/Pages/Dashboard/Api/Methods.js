import { getRequest } from "../../../Config/Axios/AxiosConfig";

export const fetchAllUsers = async () => {
  return await getRequest("users");
};

export const fetchUserMessageHistory = async (senderId, receiverId) => {
  return await getRequest(
    `messages?sender_id=${senderId}&receiver_id=${receiverId}`
  );
};
