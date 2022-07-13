import { logout } from '../integrations/firebase.js';

export const logoutCtrl = () => {
  const loggedInSideBar = document.querySelector('.logged-in-sidebar');

  logoutBtn.addEventListener('click', async () => {
    await logout();
    loggedInSideBar.classList.remove('m-active-nav');
    window.location.replace('#home');
    window.location.reload();
  });
};
