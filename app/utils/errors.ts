export const ERRORS = {
  EMPTY_FIELDS: "Please fill in both fields",
  SPECIAL_CHAR_REQUIRED: "Kindly include special characters",
  USERNAME_NUMERIC: "Username must have numbers",
  SIGNUP_FAILED: "Signup failed. Check console for details.",
  LOGIN_FAILED: "Login failed. Make sure you've signed up first!",
  INVALID_CREDENTIALS: "Invalid credentials",
};

export function getErrorMessage(key: keyof typeof ERRORS): string {
  return ERRORS[key];
}
