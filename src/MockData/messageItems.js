import { mockChattingWith, mockCurrentUser } from "./userItems";

export const mockMessages = [
  { id: 1, content: "Hello", sender_id: 1, receiver_id: 2 },
  { id: 2, content: "How are you?", sender_id: 1, receiver_id: 2 },
];

export const mockMessage = {
  id: 1,
  content: "Hello",
  sender_id: 1,
  receiver_id: 2,
};

export const mockIncomingMessage = {
  id: 1,
  content: "Hello",
  sender_id: 2,
  receiver_id: 1,
};

export const mockIncomingMessages = [
  { id: 1, content: "Hello", sender_id: 2, receiver_id: 1 },
  { id: 2, content: "How are you?", sender_id: 2, receiver_id: 1 },
];

export const mockNewMessage = {
  id: 1234,
  content: "This is a new message",
  sender_id: 1,
  receiver_id: 2,
};

export const mockChatMessages = [
  {
    direction: "outgoing",
    id: 1,
    message: "Hello",
    position: "single",
    sender_id: mockCurrentUser.id,
    receiver_id: mockChattingWith.id,
  },
  {
    direction: "incoming",
    id: 2,
    message: "Hey there",
    position: "single",
    sender_id: mockChattingWith.id,
    receiver_id: mockCurrentUser.id,
  },
  {
    direction: "outgoing",
    id: 3,
    message: "How are you?",
    position: "single",
    sender_id: mockCurrentUser.id,
    receiver_id: mockChattingWith.id,
  },
];
