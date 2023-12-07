import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithProviders } from "../../../../../../jest.setup";

import { mockUsers } from "../../../../../MockData/userItems";
import { mockMessages } from "../../../../../MockData/messageItems";
import * as DashboardMethods from "../../../Api/DashboardMethods";
import * as DashboardHelpers from "../../../DashboardHelpers";
import Conversations from "../Conversations";

describe("Conversations", () => {
  test("renders no users found when users array is empty", () => {
    const { container } = renderWithProviders(
      <Conversations currentUser={{}} users={[]} />
    );

    const noUsersFoundText = screen.getByText("No users found");
    expect(noUsersFoundText).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  test("renders conversation list with users", async () => {
    const { container } = renderWithProviders(
      <Conversations currentUser={{}} users={mockUsers} />
    );

    const conversationList = screen.getByRole("list");
    const conversationItems = screen.getAllByRole("listitem");

    expect(conversationList).toBeInTheDocument();
    expect(conversationItems.length).toBe(mockUsers.length);

    expect(container).toMatchSnapshot();
  });

  test("handles click on conversation item", async () => {
    const fetchUserMessageHistorySpy = jest.spyOn(
      DashboardMethods,
      "fetchUserMessageHistory"
    );
    const convertApiMessagesToChatMessagesSpy = jest.spyOn(
      DashboardHelpers,
      "convertApiMessagesToChatMessages"
    );

    fetchUserMessageHistorySpy.mockResolvedValueOnce({
      data: mockMessages,
    });
    convertApiMessagesToChatMessagesSpy.mockReturnValueOnce(mockMessages);

    const { container } = renderWithProviders(
      <Conversations currentUser={{}} users={mockUsers} />
    );

    const conversationItem = screen.getByText(/Test User1/i);
    await userEvent.click(conversationItem);

    expect(fetchUserMessageHistorySpy).toHaveBeenCalledWith(mockUsers[0].id);
    expect(convertApiMessagesToChatMessagesSpy).toHaveBeenCalledWith(
      mockMessages,
      {},
      mockUsers[0]
    );

    fetchUserMessageHistorySpy.mockRestore();
    convertApiMessagesToChatMessagesSpy.mockRestore();

    expect(container).toMatchSnapshot();
  });
});
