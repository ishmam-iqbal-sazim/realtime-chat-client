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
