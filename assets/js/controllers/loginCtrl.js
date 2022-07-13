import { closeModal, renderNavBar } from "../../../index.js";
import { login } from "../integrations/firebase.js";

export const loginCtrl = () => {
  loginBtn.addEventListener("click", async () => {
    const { error } = await login(loginEmail.value, loginPassword.value);
    if (error) {
      loginError.innerHTML = error.message;
      return;
    }
    
    closeModal();
    renderNavBar();
    window.location.replace("#home");
  });
};
