import { Route, Router } from "./assets/js/classes/router.js";
import authCtrl from "./assets/js/controllers/authCtrl.js";
import { storybookCtrl } from "./assets/js/controllers/storybookCtrl.js";
import { mapCtrl } from "./assets/js/controllers/mapCtrl.js";
import { userAuthState, getUser } from "./assets/js/integrations/firebase.js";
import { profileCtrl } from "./assets/js/controllers/profileCtrl.js";
import { groupsCtrl } from "./assets/js/controllers/groupsCtrl.js";

const hamburgerIcons = document.querySelectorAll(".hamburger-icon");
const crossIcons = document.querySelectorAll(".cross-icon");
const loggedOutSideBar = document.querySelector(".logged-out-sidebar");
const loggedInSideBar = document.querySelector(".logged-in-sidebar");
const loggedOutNavbar = document.querySelector(".td-logged-out");
const loggedInNavbar = document.querySelector(".td-logged-in");
const createListingNavbar = document.querySelector(".td-create-listing");
const userImage = document.querySelectorAll(".user-image");
const userName = document.querySelectorAll(".user-name");

const authGuard = async () => {
  if (!userAuthState) {
    window.location.replace("#home");
  }

  return userAuthState;
};

/**:thun
 * 
 * @param {string} currentPage 
 * @param {object} loggedInUser 
 */
const updateNavbar = (currentPage, loggedInUser) => {
  if (currentPage === "") {
    currentPage = "#home";
  }

  if (loggedInUser === null) {
    loggedOutNavbar.classList.add("td-active-nav");
    loggedOutSideBar.classList.add("m-active-nav");
  } else {
    userImage.forEach((image) => (image.src = loggedInUser.photoUrl));
    userName.forEach(
      (name) => (name.children[0].innerHTML = loggedInUser.firstName)
    );

    loggedInSideBar.classList.add("m-active-nav");
  }

  if (loggedInUser && currentPage === "#listing") {
    createListingNavbar.classList.add("td-active-nav");
  } else if (
    loggedInUser &&
    (currentPage === "#home" ||
      currentPage === "#profile" ||
      currentPage === "#groups")
  ) {
    loggedInNavbar.classList.add("td-active-nav");
  }
};

window.addEventListener("load", () => {
  renderNavBar();
});

export const renderNavBar = async () => {
  loggedOutNavbar.classList.remove("td-active-nav");
  loggedInNavbar.classList.remove("td-active-nav");
  createListingNavbar.classList.remove("td-active-nav");

  loggedOutSideBar.classList.remove("m-active-nav");
  loggedInSideBar.classList.remove("m-active-nav");

  const currentPage = window.location.hash;
  let loggedInUser = null;

  if (userAuthState) {
    while (!loggedInUser) {
      loggedInUser = await getUser(userAuthState?.uid);
    }
  }
  updateNavbar(currentPage, loggedInUser);
};

// on page change - update navbar
window.addEventListener("hashchange", () => {
  renderNavBar();
});

const toggleSidebar = async (icon) => {
  icon.addEventListener("click", () => {
    if (loggedOutSideBar.classList.contains("m-active-nav")) {
      loggedOutSideBar.classList.toggle("sidebar-active");
    } else if (loggedInSideBar.classList.contains("m-active-nav")) {
      loggedInSideBar.classList.toggle("sidebar-active");
    }
  });
};

hamburgerIcons.forEach((icon) => toggleSidebar(icon));
crossIcons.forEach((icon) => toggleSidebar(icon));

const openLoginBtn = () => {
  authModal.classList.toggle("is-open");
  loginForm.classList.toggle("is-open");
  authCtrl.loginCtrl();
};

mOpenLoginBtn?.addEventListener("click", openLoginBtn);
tdOpenLoginBtn?.addEventListener("click", openLoginBtn);

const openRegisterBtn = () => {
  authModal.classList.toggle("is-open");
  registerForm.classList.toggle("is-open");
  authCtrl.registerCtrl();
};

mOpenRegisterBtn?.addEventListener("click", openRegisterBtn);
tdOpenRegisterBtn?.addEventListener("click", openRegisterBtn);

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

export const closeModal = () => {
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
  new Route(
    "#profile",
    "/pages/profile.html",
    [profileCtrl, authCtrl.logoutCtrl],
    true
  ),
  new Route("#groups", "/pages/groups.html", groupsCtrl, true),
  new Route("#group", "/pages/group.html", () => {}, true),
  new Route("#listing", "/pages/listing.html"),
];

Router.init("root", routes, authGuard);
