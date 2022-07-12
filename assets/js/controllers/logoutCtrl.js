import { logout } from '../integrations/firebase.js';

export const logoutCtrl = () => {
  logoutBtn.addEventListener('click', async () => {
    await logout();
    window.location.replace('#home');
  });
};
