import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../../../jest.setup";

import Login from "../Login";

describe("Login", () => {
  test("renders correctly", () => {
    const { container } = renderWithProviders(<Login />);

    const dontHaveAnAccount = screen.getByText(/Don't have an account?/i);
    const registerLink = screen.getByRole("link", { name: /register/i });

    expect(dontHaveAnAccount).toBeInTheDocument();
    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveAttribute("href", "/register");

    expect(container).toMatchSnapshot();
  });
});
