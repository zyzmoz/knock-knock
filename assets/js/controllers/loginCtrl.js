import { login } from '../integrations/firebase.js';

export const loginCtrl = () => {
  loginBtn.addEventListener('click', async () => {
    const res = await login(loginEmail.value, loginPassword.value);
    console.log({ res });
    window.location.replace('#home');
  });
};
