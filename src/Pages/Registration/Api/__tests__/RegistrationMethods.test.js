import * as AxiosConfig from "../../../../Config/Axios/AxiosConfig";
import { mockRegistrationResponse } from "../../../../MockData/responseItems";
import { createNewUser } from "../../Api/RegistrationMethods";

jest.mock("../../../../Config/Axios/AxiosConfig");

describe("User Methods", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("creates a new user", async () => {
    const userData = {
      username: "Test name",
      password: "testpassword",
    };

    AxiosConfig.postRequest.mockResolvedValueOnce(mockRegistrationResponse);

    const response = await createNewUser(userData);

    expect(response.data).toEqual(mockRegistrationResponse.data);
    expect(AxiosConfig.postRequest).toHaveBeenCalledWith("users", userData);
  });
});
