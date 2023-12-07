import {
  mockIncomingMessage,
  mockIncomingMessages,
  mockMessage,
  mockMessages,
} from "../../../MockData/messageItems";
import { mockChattingWith, mockCurrentUser } from "../../../MockData/userItems";
import {
  convertApiMessagesToChatMessages,
  convertApiMessageToChatMessage,
} from "../DashboardHelpers";

describe("convertApiMessagesToChatMessages", () => {
  test("converts API messages to chat messages for outgoing message", () => {
    const result = convertApiMessagesToChatMessages(
      mockMessages,
      mockCurrentUser,
      mockChattingWith
    );

    expect(result).toEqual([
      {
        id: 1,
        message: "Hello",
        sender: "User1",
        receiver: "User2",
        sender_id: 1,
        receiver_id: 2,
        direction: "outgoing",
        position: "single",
      },
      {
        id: 2,
        message: "How are you?",
        sender: "User1",
        receiver: "User2",
        sender_id: 1,
        receiver_id: 2,
        direction: "outgoing",
        position: "single",
      },
    ]);
  });

  test("converts API messages to chat messages for incoming message", () => {
    const result = convertApiMessagesToChatMessages(
      mockIncomingMessages,
      mockCurrentUser,
      mockChattingWith
    );

    expect(result).toEqual([
      {
        id: 1,
        message: "Hello",
        sender: "User2",
        receiver: "User1",
        sender_id: 2,
        receiver_id: 1,
        direction: "incoming",
        position: "single",
      },
      {
        id: 2,
        message: "How are you?",
        sender: "User2",
        receiver: "User1",
        sender_id: 2,
        receiver_id: 1,
        direction: "incoming",
        position: "single",
      },
    ]);
  });

  test("handles an empty array of messages", () => {
    const apiMessages = [];

    const result = convertApiMessagesToChatMessages(
      apiMessages,
      mockCurrentUser,
      mockChattingWith
    );

    expect(result).toEqual([]);
  });
});

describe("convertApiMessageToChatMessage", () => {
  test("converts API message to chat message for outgoing message", () => {
    const result = convertApiMessageToChatMessage(
      mockMessage,
      mockCurrentUser,
      mockChattingWith
    );

    expect(result).toEqual({
      id: 1,
      message: "Hello",
      sender: "User1",
      receiver: "User2",
      sender_id: 1,
      receiver_id: 2,
      direction: "outgoing",
      position: "single",
    });
  });

  test("converts API message to chat message for incoming message", () => {
    const result = convertApiMessageToChatMessage(
      mockIncomingMessage,
      mockCurrentUser,
      mockChattingWith
    );

    expect(result).toEqual({
      id: 1,
      message: "Hello",
      sender: "User2",
      receiver: "User1",
      sender_id: 2,
      receiver_id: 1,
      direction: "incoming",
      position: "single",
    });
  });

  test("handles an empty message", () => {
    const apiMessage = {};

    const result = convertApiMessageToChatMessage(
      apiMessage,
      mockCurrentUser,
      mockChattingWith
    );

    expect(result).toEqual({
      id: undefined,
      message: undefined,
      sender: "User2",
      receiver: "User1",
      sender_id: 2,
      receiver_id: 1,
      direction: "incoming",
      position: "single",
    });
  });
});
