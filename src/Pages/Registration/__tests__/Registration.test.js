import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../../../jest.setup";

import Registration from "../Registration";

describe("Registration", () => {
  test("renders correctly", () => {
    const { container } = renderWithProviders(<Registration />);

    const alreadyHaveAnAccount = screen.getByText(/Already have an account?/i);
    const loginLink = screen.getByRole("link", { name: /login/i });

    expect(alreadyHaveAnAccount).toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute("href", "/");

    expect(container).toMatchSnapshot();
  });
});
