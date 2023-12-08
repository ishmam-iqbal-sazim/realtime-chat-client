import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import ActionCable from "actioncable";

import * as DashboardMethods from "../Api/DashboardMethods";
import Dashboard from "../Dashboard";
import {
  mockChattingWith,
  mockCurrentUser,
  mockUsers,
  newUser,
} from "../../../MockData/userItems";

const mockStore = configureStore([]);

describe("Dashboard", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("renders correctly and fetches all users", async () => {
    const initialState = {
      auth: { user: mockCurrentUser },
      chat: { chatUser: null },
    };

    const store = mockStore(initialState);

    jest.spyOn(DashboardMethods, "fetchAllUsers").mockResolvedValueOnce({
      data: [...mockUsers],
    });

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </Provider>
    );
    const userNameElement = screen.getByText(mockCurrentUser.username);
    const selectSomeoneToChatWithElement = screen.getByText(
      "Select someone to chat with"
    );

    await waitFor(() =>
      expect(selectSomeoneToChatWithElement).toBeInTheDocument()
    );
    expect(userNameElement).toBeInTheDocument();
    expect(DashboardMethods.fetchAllUsers).toHaveBeenCalled();

    expect(container).toMatchSnapshot();
  });

  test("does not render 'Select someone to chat with' when there is an active chat", async () => {
    const initialState = {
      auth: { user: mockCurrentUser },
      chat: { chatUser: mockChattingWith, messages: [] },
    };

    const store = mockStore(initialState);

    jest.spyOn(DashboardMethods, "fetchAllUsers").mockResolvedValueOnce({
      data: [],
    });

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() =>
      expect(
        screen.queryByText("Select someone to chat with")
      ).not.toBeInTheDocument()
    );

    expect(container).toMatchSnapshot();
  });
});

describe("ActionCable Socket", () => {
  test("establishes connection and invokes received method with newUser", async () => {
    const initialState = {
      auth: { user: mockCurrentUser },
      chat: { chatUser: mockChattingWith, messages: [] },
    };

    const store = mockStore(initialState);

    jest.spyOn(DashboardMethods, "fetchAllUsers").mockResolvedValueOnce({
      data: [],
    });

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

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(createConsumerSpy).toHaveBeenCalled();

      expect(mockSubscription.create).toHaveBeenCalledWith(
        {
          channel: "AppearanceChannel",
        },
        {
          received: expect.any(Function),
        }
      );
    });

    act(() => {
      mockSubscription.create.mock.calls[0][1].received(newUser);
    });

    expect(screen.getByText(/New user/i)).toBeInTheDocument();
  });
});
