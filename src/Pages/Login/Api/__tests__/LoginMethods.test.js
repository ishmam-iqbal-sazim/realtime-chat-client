import * as AxiosConfig from "../../../../Config/Axios/AxiosConfig";
import { mockLoginResponse } from "../../../../MockData/responseItems.js";
import { loginUser, revokeToken } from "../../Api/LoginMethods";

jest.mock("../../../../Config/Axios/AxiosConfig");

describe("LoginMethods", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("logins a user", async () => {
    const userData = {
      username: "Test name",
      password: "testpassword",
    };

    AxiosConfig.postRequest.mockResolvedValueOnce(mockLoginResponse);

    const response = await loginUser(userData);

    expect(response.data).toEqual(mockLoginResponse.data);
    expect(AxiosConfig.postRequest).toHaveBeenCalledWith("login", userData);
  });

  test("revokes a user token", async () => {
    const userToken = {
      token: "mockToken",
    };

    AxiosConfig.postRequest.mockResolvedValueOnce();

    const response = await revokeToken(userToken);

    expect(AxiosConfig.postRequest).toHaveBeenCalledWith(
      "revoke_token",
      userToken
    );
  });
});
