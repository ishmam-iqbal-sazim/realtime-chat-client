import { authPostRequest } from "../../../Config/Axios/AuthConfig";
import { postRequest } from "../../../Config/Axios/AxiosConfig";

export const loginUser = async (user) => {
  return await postRequest("login", user);
};

export const generateToken = async (token) => {
  return await authPostRequest("token", token);
};

export const revokeToken = async (token) => {
  return await authPostRequest("revoke", {
    token: token.access_token,
    client_id: token.client_id,
    client_secret: token.client_secret,
  });
};
