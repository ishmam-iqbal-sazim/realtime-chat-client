import { configure, render, screen, waitFor } from "@testing-library/react";
import { act } from "react-test-renderer";
import ActionCable from "actioncable";

import { renderWithProviders } from "../../../../../../jest.setup";

import { setMessages } from "../../../../../Stores/Actions/chat";
import {
  mockChatMessages,
  mockNewMessage,
} from "../../../../../MockData/messageItems";
import * as ApiMethods from "../../../Api/DashboardMethods";
import {
  mockChattingWith,
  mockCurrentUser,
} from "../../../../../MockData/userItems";
import Chat from "../Chat";
import userEvent from "@testing-library/user-event";

configure({ testIdAttribute: "data-placeholder" });

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn().mockReturnValue(jest.fn()),
  useDispatch: jest.fn().mockReturnValue(jest.fn()),
}));

describe("Chat", () => {
  test("renders correctly with populated messages", async () => {
    jest
      .spyOn(require("react-redux"), "useSelector")
      .mockReturnValue([...mockChatMessages]);
    jest
      .spyOn(require("react-redux"), "useDispatch")
      .mockReturnValue([...mockChatMessages]);

    const { container } = renderWithProviders(
      <Chat chattingWith={mockChattingWith} currentUser={mockCurrentUser} />
    );

    const usernameElement = screen.getByText(mockChattingWith.username);
    const message1Element = screen.getByText(mockChatMessages[0].message);
    const message2Element = screen.getByText(mockChatMessages[1].message);
    const message3Element = screen.getByText(mockChatMessages[2].message);
    const inputElement = screen.getByTestId(/type message here/i);
    const sendButtonElement = screen.getByRole("button");

    expect(usernameElement).toBeInTheDocument();

    await waitFor(() => {
      expect(message1Element).toBeInTheDocument();
      expect(message2Element).toBeInTheDocument();
      expect(message3Element).toBeInTheDocument();
    });

    expect(inputElement).toBeInTheDocument();
    expect(sendButtonElement).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  test("renders 'Say Hi' when there's no message history and calls sendMessage on 'Say Hi' click", async () => {
    jest.spyOn(require("react-redux"), "useSelector").mockReturnValue([]);
    jest.spyOn(require("react-redux"), "useDispatch").mockReturnValue([]);
    const sendMessageSpy = jest.spyOn(ApiMethods, "sendMessage");

    const { container } = renderWithProviders(
      <Chat chattingWith={mockChattingWith} currentUser={mockCurrentUser} />
    );

    const sayHiElement = screen.getByText(/say hi!/i);

    await waitFor(() => {
      expect(sayHiElement).toBeInTheDocument();
    });

    await userEvent.click(sayHiElement);

    await waitFor(() => {
      expect(sendMessageSpy).toBeCalledWith({
        content: "Hi!",
        sender_id: mockCurrentUser.id,
        receiver_id: mockChattingWith.id,
      });
    });

    expect(container).toMatchSnapshot();
  });

  test("calls sendMessage with message object on send button click", async () => {
    jest
      .spyOn(require("react-redux"), "useSelector")
      .mockReturnValue([...mockChatMessages]);
    jest
      .spyOn(require("react-redux"), "useDispatch")
      .mockReturnValue([...mockChatMessages]);
    const sendMessageSpy = jest.spyOn(ApiMethods, "sendMessage");

    renderWithProviders(
      <Chat chattingWith={mockChattingWith} currentUser={mockCurrentUser} />
    );

    const inputElement = screen.getByTestId(/type message here/i);
    const sendButtonElement = screen.getByRole("button");

    await userEvent.type(inputElement, "This is a test");
    await userEvent.click(sendButtonElement);

    await waitFor(() => {
      expect(sendMessageSpy).toBeCalledWith({
        content: "This is a test",
        sender_id: mockCurrentUser.id,
        receiver_id: mockChattingWith.id,
      });
    });
  });
});

describe("ActionCable", () => {
  test("invokes received method when new message received", async () => {
    let mockMessages = [...mockChatMessages];

    jest
      .spyOn(require("react-redux"), "useSelector")
      .mockImplementation((selector) =>
        selector({ chat: { messages: mockMessages } })
      );

    const mockDispatch = jest.fn();

    jest
      .spyOn(require("react-redux"), "useDispatch")
      .mockReturnValue(mockDispatch);

    const mockReceived = jest.fn();
    const mockUnsubscribe = jest.fn();

    const mockSubscription = {
      create: jest.fn().mockReturnValue({
        received: mockReceived,
        unsubscribe: mockUnsubscribe,
      }),
    };

    const createConsumerSpy = jest.spyOn(ActionCable, "createConsumer");

    createConsumerSpy.mockReturnValueOnce({
      subscriptions: {
        ...mockSubscription,
      },
    });

    renderWithProviders(
      <Chat chattingWith={mockChattingWith} currentUser={mockCurrentUser} />
    );

    await waitFor(() => {
      expect(createConsumerSpy).toBeCalled();
      expect(mockSubscription.create).toHaveBeenCalledWith(
        {
          channel: "ChatChannel",
          sender_id: mockCurrentUser.id,
          receiver_id: mockChattingWith.id,
        },
        {
          received: expect.any(Function),
        }
      );
    });

    act(() => {
      mockSubscription.create.mock.calls[0][1].received(mockNewMessage);
    });

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        setMessages([
          ...mockChatMessages,
          {
            id: mockNewMessage.id,
            message: mockNewMessage.content,
            position: "single",
            receiver: "User2",
            receiver_id: mockNewMessage.receiver_id,
            sender: "User1",
            sender_id: mockNewMessage.sender_id,
            direction: mockNewMessage.sender_id === 1 ? "outgoing" : "incoming",
          },
        ])
      );
    });
  });
});
