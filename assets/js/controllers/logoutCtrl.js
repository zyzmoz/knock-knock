import { logout } from '../integrations/firebase.js';

export const logoutCtrl = () => {
  const logoutBtns = document.querySelectorAll('.logoutBtn');

  const logoutUser = async (btn) => {
    btn.addEventListener('click', async () => {
      await logout();

      window.location.reload();
    });
  };

  logoutBtns.forEach((btn) => logoutUser(btn));
};
