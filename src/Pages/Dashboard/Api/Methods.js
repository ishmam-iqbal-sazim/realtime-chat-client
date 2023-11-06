import { getRequest } from "../../../Config/Axios/AxiosConfig";

export const getUsers = async () => {
  return await getRequest("users");
};
