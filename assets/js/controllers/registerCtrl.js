import { closeModal, renderNavBar } from "../../../index.js";
import { User } from "../classes/User.js";
import { register } from "../integrations/firebase.js";

export const registerCtrl = () => {
  // password confirmation
  passwordConfirmation.addEventListener("focusout", () => {
    const password = document.getElementById("password").value;
    const passwordConfirmation = document.getElementById(
      "passwordConfirmation"
    ).value;

    if (password != passwordConfirmation) {
      loginError.innerHTML = "Passwords don't match";
    }
  });

  registerBtn.addEventListener("click", async () => {
    const passwordOriginal = document.getElementById("password").value;
    const passwordConfirmation = document.getElementById(
      "passwordConfirmation"
    ).value;

    if (passwordOriginal != passwordConfirmation) {
      Error.innerHTML = "Passwords don't match";
      return;
    }

    const user = new User({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: passwordOriginal,
      photoUrl: "https://picsum.photos/200/200",
    });
    const { error } = await register(user);
    
    if (error) {
      registerError.innerHTML = error.message;
      return;
    }

    closeModal();
    renderNavBar();
    window.location.replace("#home");
  });
};
