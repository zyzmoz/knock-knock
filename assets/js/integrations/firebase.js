import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";
import {
  getDatabase,
  set,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";

import config from "../../../config.json" assert { type: "json" };

import { buildError } from "../utils/firebaseErrors.js";

// Initialize Firebase
const app = initializeApp(config.firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

let userAuthState = null;
auth.onAuthStateChanged(async (user) => {
  //The callback is passed user parameter from event
  if (user) {
    userAuthState = user;
  } else {
    userAuthState = null;
    console.log("Not signed in");
  }
});

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

const logout = () => {
  signOut(auth);
};

const findMany = async (collection, callback = (res) => {}) => {
  const _ref = ref(database, `${collection}`);
  onValue(_ref, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};

const findOne = async (collection, uid, callback = (res) => {}) => {
  const _ref = ref(database, `${collection}/${uid}`);
  onValue(_ref, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};

const createOrUpdateData = async (collection, uid, data) => {
  const updateColletion = uid ? `${collection}/${uid}` : `${collection}`;
  const res = await set(ref(database, updateColletion), {
    ...data,
  }).catch((error) => ({ error }));

  if (res?.error) {
    return { error: buildError(res.error) };
  }
};

const deleteData = async (collection, uid) => {
  await ref(database, updateColletion).remove();
};

export {
  app,
  auth,
  database,
  login,
  register,
  logout,
  userAuthState,
  createOrUpdateData,
  deleteData,
  findOne,
  findMany,
};
