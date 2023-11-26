import { postRequest } from "../../../Config/Axios/AxiosConfig";

export const loginUser = async (user) => {
  return await postRequest("login", user);
};

export const revokeToken = async (token) => {
  return await postRequest("revoke_token", token);
};
