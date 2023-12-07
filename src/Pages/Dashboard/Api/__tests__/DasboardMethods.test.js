import * as AxiosConfig from "../../../../Config/Axios/AxiosConfig";
import { mockMessage, mockMessages } from "../../../../MockData/messageItems";
import { mockMessageResponse } from "../../../../MockData/responseItems";
import { mockUsers } from "../../../../MockData/userItems";
import {
  fetchAllUsers,
  fetchUserMessageHistory,
  sendMessage,
} from "../DashboardMethods";

jest.mock("../../../../Config/Axios/AxiosConfig");

describe("API Methods", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("fetches all users", async () => {
    AxiosConfig.getRequest.mockResolvedValueOnce({ data: mockUsers });

    const response = await fetchAllUsers();

    expect(response.data).toEqual(mockUsers);
    expect(AxiosConfig.getRequest).toHaveBeenCalledWith("users");
  });

  test("fetches user message history", async () => {
    const receiverId = 2;

    AxiosConfig.getRequest.mockResolvedValueOnce({ data: mockMessages });

    const response = await fetchUserMessageHistory(receiverId);

    expect(response.data).toEqual(mockMessages);
    expect(AxiosConfig.getRequest).toHaveBeenCalledWith(
      `messages?chatting_with=${receiverId}`
    );
  });

  test("sends a message", async () => {
    AxiosConfig.postRequest.mockResolvedValueOnce(mockMessageResponse);

    const response = await sendMessage(mockMessage);

    expect(response.data).toEqual(mockMessageResponse.data);
    expect(AxiosConfig.postRequest).toHaveBeenCalledWith(
      "messages",
      mockMessage
    );
  });
});
