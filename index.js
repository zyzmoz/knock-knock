import { Route, Router } from './assets/js/classes/router.js';
import authCtrl from './assets/js/controllers/authCtrl.js';
import { storybookCtrl } from './assets/js/controllers/storybookCtrl.js';
import { mapCtrl } from './assets/js/controllers/mapCtrl.js';
import { userAuthState, getUser } from './assets/js/integrations/firebase.js';
import { profileCtrl } from './assets/js/controllers/profileCtrl.js';
import { listingCtrl } from './assets/js/controllers/listingCtrl.js';
import { homeCtrl } from './assets/js/controllers/homeCtrl.js';
import { groupsCtrl } from './assets/js/controllers/groupsCtrl.js';

const hamburgerIcons = document.querySelectorAll('.hamburger-icon');
const crossIcons = document.querySelectorAll('.cross-icon');
const loggedOutSideBar = document.querySelector('.logged-out-sidebar');
const loggedInSideBar = document.querySelector('.logged-in-sidebar');
const loggedOutNavbar = document.querySelector('.td-logged-out');
const loggedInNavbar = document.querySelector('.td-logged-in');
const createListingNavbar = document.querySelector('.td-create-listing');
const userImage = document.querySelectorAll('.user-image');
const userName = document.querySelectorAll('.user-name');
const sidebarItems = document.querySelectorAll('.sidebar-items');

export let currentLocation;
const success = (position) => {
  currentLocation = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  };
};

const error = () => {
  return { error: "Geolocation is not supported by your brwser" };
};

navigator.geolocation.getCurrentPosition(success, error);

const authGuard = async () => {
  if (!userAuthState) {
    window.location.replace('#home');
  }

  return userAuthState;
};

/**
 *
 * @param {string} currentPage
 * @param {object} loggedInUser
 */
const updateNavbar = (currentPage, loggedInUser) => {
  if (currentPage === '') {
    currentPage = '#home';
  }

  if (loggedInUser === null) {
    loggedOutNavbar.classList.add('td-active-nav');
    loggedOutSideBar.classList.add('m-active-nav');
  } else {
    userImage.forEach((image) => (image.src = loggedInUser.photoUrl));
    userName.forEach((name) => (name.children[0].innerHTML = loggedInUser.firstName));

    loggedInSideBar.classList.add('m-active-nav');
  }

  if (loggedInUser && currentPage === '#listing') {
    createListingNavbar.classList.add('td-active-nav');
  } else if (loggedInUser && (currentPage === '#home' || currentPage === '#profile' || currentPage === '#groups')) {
    loggedInNavbar.classList.add('td-active-nav');
  }
};

export const renderNavBar = async () => {
  loggedOutNavbar.classList.remove('td-active-nav');
  loggedInNavbar.classList.remove('td-active-nav');
  createListingNavbar.classList.remove('td-active-nav');

  loggedOutSideBar.classList.remove('m-active-nav');
  loggedInSideBar.classList.remove('m-active-nav');

  const currentPage = window.location.hash;
  let loggedInUser = null;
  console.log({ userAuthState });

  loggedInUser = await getUser(userAuthState?.uid);

  if (userAuthState) {
    loggedInUser = await getUser(userAuthState?.uid);
  }
  updateNavbar(currentPage, loggedInUser);
};

window.addEventListener('DOMContentLoaded', async () => {
  await renderNavBar();
});

// on page change - update navbar
window.addEventListener('hashchange', async () => {
  await renderNavBar();
});

const toggleSidebar = async (icon) => {
  icon.addEventListener('click', () => {
    if (loggedOutSideBar.classList.contains('m-active-nav')) {
      loggedInSideBar.classList.remove('sidebar-active');
      loggedOutSideBar.classList.toggle('sidebar-active');
    } else if (loggedInSideBar.classList.contains('m-active-nav')) {
      loggedOutSideBar.classList.remove('sidebar-active');
      loggedInSideBar.classList.toggle('sidebar-active');
    }
  });
};

hamburgerIcons.forEach((icon) => toggleSidebar(icon));
crossIcons.forEach((icon) => toggleSidebar(icon));

sidebarItems.forEach((item) => {
  let itemChildren = Array.from(item.children);
  itemChildren.forEach((child) => toggleSidebar(child));
});

const openLoginBtn = () => {
  authModal.classList.toggle('is-open');
  loginForm.classList.toggle('is-open');
  authCtrl.loginCtrl();
};

mOpenLoginBtn?.addEventListener('click', openLoginBtn);
tdOpenLoginBtn?.addEventListener('click', openLoginBtn);

const openRegisterBtn = () => {
  authModal.classList.toggle('is-open');
  registerForm.classList.toggle('is-open');
  authCtrl.registerCtrl();
};

mOpenRegisterBtn?.addEventListener('click', openRegisterBtn);
tdOpenRegisterBtn?.addEventListener('click', openRegisterBtn);

toggleToRegisterBtn?.addEventListener('click', () => {
  registerForm.classList.toggle('is-open');
  loginForm.classList.toggle('is-open');
  authCtrl.registerCtrl();
});

toggleToLoginBtn?.addEventListener('click', () => {
  registerForm.classList.toggle('is-open');
  loginForm.classList.toggle('is-open');
  authCtrl.loginCtrl();
});

export const closeModal = () => {
  authModal.classList.remove('is-open');
  registerForm.classList.remove('is-open');
  loginForm.classList.remove('is-open');
};

// Close modal
authModal.addEventListener('click', (e) => {
  if (e.target.classList.toString().includes('auth-modal')) {
    closeModal();
  }
});

const routes = [
  new Route('#home', '/pages/home.html', homeCtrl),
  new Route('#storybook', '/pages/dev/storybook.html', [storybookCtrl, mapCtrl], false),
  new Route('#profile', '/pages/profile.html', [profileCtrl, authCtrl.logoutCtrl], true),
  new Route('#groups', '/pages/groups.html', groupsCtrl, true),
  new Route('#listing', '/pages/listing.html', [listingCtrl, mapCtrl], true),
];

Router.init('root', routes, authGuard);
