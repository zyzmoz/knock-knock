export const buildError = (error) => {
  let message = "Unknown Error";
  switch (error.code) {
    case "auth/user-not-found":
      message = "Email or password incorrect!";
      break;

    case "auth/wrong-password":
      message = "Password Incorect!";
      break;
    case "auth/email-already-in-use":
      message = "Email already in use";
      break;
    default:
      break;
  }
  return {
    code: error.code,
    message,
  };
};
