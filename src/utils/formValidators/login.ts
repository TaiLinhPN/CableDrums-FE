export const emailValidator = (email: string): string | undefined => {
  if (!email || email.length === 0) {
    return "Email cannot be empty";
  }
  const isEmailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
  if (!isEmailValid) {
    return "Email must be a valid email address";
  }
  return undefined;
};

export const passwordValidator = (password: string): string | undefined => {
  if (!password || password.length === 0) {
    return "Password cannot be empty";
  }
  const isPasswordValid =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
      password
    );
  if (!isPasswordValid) {
    return "Password must be at least 8 characters long and contain at least one letter, one number, and one special character";
  }
  return undefined;
};
