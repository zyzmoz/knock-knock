export const buildError = (error) => {
  let message;
  switch (error.code) {
    case "auth/user-not-found":
      message = "Email or password incorrect! Please check the information!";
      break;

    case "auth/wrong-password":
      message = "Password Incorect!";
      break;
    case "auth/email-already-in-use":
      message = "Email already in use! Please try another email!";
      break;
    default:
      message = "Unknown Error! Please try again!";
      break;
  }
  return {
    code: error.code,
    message,
  };
};
