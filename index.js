import { Route, Router } from "./assets/js/classes/router.js";
import authCtrl from "./assets/js/controllers/authCtrl.js";
import { storybookCtrl } from "./assets/js/controllers/storybookCtrl.js";
<<<<<<< HEAD
import { mapCtrl } from "./assets/js/controllers/mapCtrl.js";
=======
import { userAuthState } from "./assets/js/integrations/firebase.js";
>>>>>>> a80f144 (Auth Guard refactor)

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

signOutBtn.addEventListener("click", () => {
  authCtrl.logout();
  window.location.replace("#home");
});

// Close modal
// authModal.addEventListener("click", (e) => {
//   const elem =
//   document.getElementById("loginForm") || document.getElementById("register");
//   console.log(elem)
//   if (!document.getElementById(elem)?.contains(e.target)) {
//     authModal.classList.remove("is-open");
//     registerForm.classList.remove("is-open");
//     loginForm.classList.remove("is-open");
//   }
// });

const routes = [
  new Route("#home", "/pages/home.html"),
  new Route("#storybook", "/pages/dev/storybook.html", [storybookCtrl, mapCtrl], false),
  new Route("#profile", "/pages/profile.html", () => {}, true),
  new Route("#groups", "/pages/groups.html"),
  new Route("#group", "/pages/group.html"),
];

Router.init("root", routes, authGuard);
