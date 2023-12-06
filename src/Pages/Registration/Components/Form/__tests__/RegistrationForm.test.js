import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithProviders } from "../../../../../../jest.setup";

import { mockRegistrationResponse } from "../../../../../MockData/responseItems";
import { LoginFormValidationSchema } from "../../../../Login/Validation/LoginValidation";
import * as apiMethods from "../../../Api/RegistrationMethods";
import RegistrationForm from "../RegistrationForm";

describe("RegistrationForm", () => {
  test("renders correctly", () => {
    const { container } = renderWithProviders(<RegistrationForm />);

    const headingElement = screen.getByRole("heading", {
      level: 1,
    });
    const usernameInput = screen.getByPlaceholderText(/Your username/i);
    const passwordInput = screen.getByPlaceholderText(/Your password/i);
    const submitButton = screen.getByRole("button", {
      name: "Submit",
    });

    expect(headingElement).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  test("call createNewUser function with user as argument if form submitted with valid inputs", async () => {
    const createNewUserSpy = jest.spyOn(apiMethods, "createNewUser");

    createNewUserSpy.mockResolvedValue(mockRegistrationResponse);
    renderWithProviders(<RegistrationForm />);

    const usernameInput = screen.getByPlaceholderText(/Your username/i);
    const passwordInput = screen.getByPlaceholderText(/Your password/i);
    const submitButton = screen.getByRole("button", {
      name: "Submit",
    });

    await userEvent.type(usernameInput, "Test name");
    await userEvent.type(passwordInput, "password");

    await userEvent.click(submitButton);

    expect(createNewUserSpy).toHaveBeenCalledWith({
      username: "Test name",
      password: "password",
    });
  });

  test("renders required validation error if form submitted with empty inputs", async () => {
    const { container } = renderWithProviders(<RegistrationForm />);

    const submitButton = screen.getByRole("button", {
      name: "Submit",
    });

    await userEvent.click(submitButton);

    expect(
      screen.queryByText(
        LoginFormValidationSchema.validateUsername.required.message
      )
    ).toBeInTheDocument();
    expect(
      screen.queryByText(
        LoginFormValidationSchema.validatePassword.required.message
      )
    ).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  test("renders minLength validation error if form submitted with short inputs", async () => {
    const { container } = renderWithProviders(<RegistrationForm />);

    const usernameInput = screen.getByPlaceholderText(/Your username/i);
    const passwordInput = screen.getByPlaceholderText(/Your password/i);
    const submitButton = screen.getByRole("button", {
      name: "Submit",
    });

    await userEvent.type(usernameInput, "12");
    await userEvent.type(passwordInput, "1234567");
    await userEvent.click(submitButton);

    expect(
      screen.queryByText(
        LoginFormValidationSchema.validateUsername.minLength.message
      )
    ).toBeInTheDocument();
    expect(
      screen.queryByText(
        LoginFormValidationSchema.validatePassword.minLength.message
      )
    ).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  test("renders maxLength validation error if form submitted with long inputs", async () => {
    const { container } = renderWithProviders(<RegistrationForm />);

    const usernameInput = screen.getByPlaceholderText(/Your username/i);
    const passwordInput = screen.getByPlaceholderText(/Your password/i);
    const submitButton = screen.getByRole("button", {
      name: "Submit",
    });

    const longInput = "a".repeat(270);

    await userEvent.type(usernameInput, longInput);
    await userEvent.type(passwordInput, longInput);
    await userEvent.click(submitButton);

    expect(
      screen.queryByText(
        LoginFormValidationSchema.validateUsername.maxLength.message
      )
    ).toBeInTheDocument();
    expect(
      screen.queryByText(
        LoginFormValidationSchema.validatePassword.maxLength.message
      )
    ).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
