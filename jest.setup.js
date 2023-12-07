import "@testing-library/jest-dom";

import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";

import { store } from "./src/Stores/store";
import { MemoryRouter } from "react-router-dom";

export function renderWithProviders(
  ui,
  { preloadedState = {}, ...renderOptions } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <MemoryRouter>{children}</MemoryRouter>
      </Provider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn().mockReturnValue(jest.fn()),
  useDispatch: jest.fn().mockReturnValue(jest.fn()),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn().mockReturnValue(jest.fn()),
}));

window.alert = (msg) => {
  console.log(msg);
};
