import { Route, Router } from "./assets/js/classes/router.js";
import { storybookCtrl } from "./assets/js/controllers/storybookCtrl.js";

const authGuard = () => {
  // mock data from localStorage
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  console.log({ isAuthenticated: isAuthenticated == "true" });
  if (isAuthenticated == "true") {
    return true;
  }

  window.location.replace("#home");
  return false;
};
const routes = [
  new Route("#storybook", "/pages/dev/storybook.html", storybookCtrl, true),
  new Route("#home", "/pages/home.html"),
  new Route("#profile", "/pages/profile.html"),
  new Route("#groups", "/pages/groups.html"),
  new Route("#group", "/pages/group.html"),
];

Router.init("root", routes, authGuard);
