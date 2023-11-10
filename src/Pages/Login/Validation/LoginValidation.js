export const LoginFormValidationSchema = {
  validateUsername: {
    required: { value: true, message: "Username is a required field." },
    minLength: {
      value: 3,
      message: "Username must be at least 3 characters",
    },
    maxLength: {
      value: 250,
      message: "Username must not exceed 250 characters",
    },
  },
  validatePassword: {
    required: { value: true, message: "Password is a required field." },
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters.",
    },
    maxLength: {
      value: 250,
      message: "Password must not exceed 250 characters.",
    },
  },
};
