import { getRequest } from "../../../Config/Axios/AxiosConfig";

export const fetchAllUsers = async () => {
  return await getRequest("users");
};
