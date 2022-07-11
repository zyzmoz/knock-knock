import { Route, Router } from "./assets/js/classes/router.js";
import authCtrl from "./assets/js/controllers/authCtrl.js";
import { storybookCtrl } from "./assets/js/controllers/storybookCtrl.js";
import { mapCtrl } from "./assets/js/controllers/mapCtrl.js";
import { userAuthState } from "./assets/js/integrations/firebase.js";
import { profileCtrl } from "./assets/js/controllers/profileCtrl.js";

const authGuard = () => {
  if (!userAuthState) {
    window.location.replace("#home");
  }
  return userAuthState;
};

openLoginBtn?.addEventListener("click", () => {
  authModal.classList.toggle("is-open");
  loginForm.classList.toggle("is-open");
  authCtrl.loginCtrl();
});

openRegisterBtn?.addEventListener("click", () => {
  authModal.classList.toggle("is-open");
  registerForm.classList.toggle("is-open");
  authCtrl.registerCtrl();
});

toggleToRegisterBtn?.addEventListener("click", () => {
  registerForm.classList.toggle("is-open");
  loginForm.classList.toggle("is-open");
  authCtrl.registerCtrl();
});

toggleToLoginBtn?.addEventListener("click", () => {
  registerForm.classList.toggle("is-open");
  loginForm.classList.toggle("is-open");
  authCtrl.loginCtrl();
});

// signOutBtn?.addEventListener("click", () => {
//   authCtrl.logout();
//   window.location.replace("#home");
// });

const closeModal = () => {
  authModal.classList.remove("is-open");
  registerForm.classList.remove("is-open");
  loginForm.classList.remove("is-open");
};

// Close modal
authModal.addEventListener("click", (e) => {
  if (e.target.classList.toString().includes("auth-modal")) {
    closeModal();
  }
});

const routes = [
  new Route("#home", "/pages/home.html"),
  new Route(
    "#storybook",
    "/pages/dev/storybook.html",
    [storybookCtrl, mapCtrl],
    false
  ),
  new Route("#profile", "/pages/profile.html", profileCtrl, true),
  new Route("#groups", "/pages/groups.html"),
  new Route("#group", "/pages/group.html"),
];

Router.init("root", routes, authGuard);
