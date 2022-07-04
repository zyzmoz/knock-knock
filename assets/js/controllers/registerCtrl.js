import { User } from "../classes/User.js";
import { register } from "../integrations/firebase.js";

export const registerCtrl = () => {
  // password confirmation
  passwordConfirmation.addEventListener("focusout", () => {
    console.log("here");
    const password = document.getElementById("password").value;
    const passwordConfirmation = document.getElementById(
      "passwordConfirmation"
    ).value;

    if (password != passwordConfirmation) {

    }
  });

  registerBtn.addEventListener("click", async() => {
    const passwordOriginal = document.getElementById("password").value;
    const passwordConfirmation = document.getElementById(
      "passwordConfirmation"
    ).value;

    if (passwordOriginal != passwordConfirmation) {
      return
    }

    const user = new User({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: passwordOriginal,
    });
    console.log(user);
    const res = await register(user);

    console.log({res})
  });
};
