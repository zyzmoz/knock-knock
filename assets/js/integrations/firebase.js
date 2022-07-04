import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";
import {
  getDatabase,
  set,
  ref,
} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";

import config from "../../../config.json" assert { type: "json" };

import { buildError } from "../utils/firebaseErrors.js";

// Initialize Firebase
const app = initializeApp(config.firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

const login = async (email, password) => {
  const res = await signInWithEmailAndPassword(auth, email, password);
  if (res?.error) {
    return { error: buildError(res.error) };
  }

  return { ...res.user };
};

const register = async (user) => {
  const { firstName, lastName, email, password } = user;
  let res = await createUserWithEmailAndPassword(auth, email, password).catch(
    (error) => ({ error })
  );
  if (res?.error) {
    return { error: buildError(res.error) };
  }

  const { uid } = res.user;

  res = await set(ref(database, "users/" + uid), {
    firstName: firstName,
    lastName: lastName,
    email: email,
  }).catch((error) => ({ error }));

  if (res?.error) {
    return { error: buildError(res.error) };
  }

  return { user: { ...user, uid } };
};

const signOut = async () => {
  await signOut(auth);
};

export { app, auth, database, login, register, signOut };
