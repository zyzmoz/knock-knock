import { Route, Router } from "./assets/js/classes/router.js";
import authCtrl from "./assets/js/controllers/authCtrl.js";
import { storybookCtrl } from "./assets/js/controllers/storybookCtrl.js";

const authGuard = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  if (isAuthenticated == "true") {
    return true;
  }

  window.location.replace("#register");
  return false;
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

// Close modal
authModal.addEventListener('click', (e) => {
  const elem = document.getElementById("loginForm") || document.getElementById("register")
  if (
    !document.getElementById(elem)?.contains(e.target)
  ) {
        authModal.classList.remove("is-open");
        registerForm.classList.remove("is-open");
        loginForm.classList.remove("is-open");
  }
});

const routes = [
  new Route("#home", "/pages/home.html"),
  new Route("#storybook", "/pages/dev/storybook.html", storybookCtrl, false),
  new Route("#profile", "/pages/profile.html"),
  new Route("#groups", "/pages/groups.html"),
  new Route("#group", "/pages/group.html"),
];

Router.init("root", routes, authGuard);
