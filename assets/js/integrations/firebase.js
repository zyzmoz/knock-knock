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
  child,
  get,
  onValue,
  push,
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
  }
});

export const getAuthState = async (callback = (res) => console.log({authState: res})) => {
  await auth.onAuthStateChanged(async (user) => {
    //The callback is passed user parameter from event
    console.log({uuu: user})
    if (user) {
      userAuthState = user;
    } else {
      userAuthState = null;
    }
    await callback(userAuthState)
  });

}

/**
 *
 * @param {string} email
 * @param {string} password
 * @returns
 */
const login = async (email, password) => {
  const res = await signInWithEmailAndPassword(auth, email, password).catch(
    (error) => ({ error })
  );
  if (res?.error) {
    return { error: buildError(res.error) };
  }

  return { ...res.user };
};

/**
 *
 * @param {object} user
 * @returns
 */
const register = async (user) => {
  const { firstName, lastName, email, password, photoUrl } = user;
  let res = await createUserWithEmailAndPassword(auth, email, password).catch(
    (error) => ({ error })
  );

  if (res?.error) {
    return { error: buildError(res.error) };
  }

  const { uid } = res.user;
  console.log({ newuser: user });
  res = await set(ref(database, "users/" + uid), {
    firstName: firstName,
    lastName: lastName,
    email: email,
    photoUrl,
  }).catch((error) => ({ error }));

  if (res?.error) {
    return { error: buildError(res.error) };
  }

  return { user: { ...user, uid } };
};

const logout = () => {
  signOut(auth);
};

const getUser = async (uid) => {
  const dbRef = ref(getDatabase());

  const snapshot = await get(child(dbRef, `users/${uid}`));

  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return null;
  }
};

/**
 *
 * @param {string} collection
 * @param {Function} callback
 */
const findMany = async (collection, callback = (res) => {}) => {
  const _ref = ref(database, `${collection}`);
  onValue(_ref, (snapshot) => {
    const data = snapshot.val();
    const ids = Object.keys(data || {});
    const arr = ids?.map((id) => ({ id, ...data[id] }));
    callback(arr);
  });
};

/**
 *
 * @param {string} collection
 * @param {string} uid
 * @param {Function} callback
 */
const findOne = async (collection, uid, callback = (res) => {}) => {
  const _ref = ref(database, `${collection}/${uid}`);
  onValue(_ref, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};

/**
 *
 * @param {string} collection
 * @param {string} uid
 * @param {object} data
 * @returns
 */
const createOrUpdateData = async (collection, uid, data) => {
  let res;

  if (uid) {
    res = await set(ref(database, `${collection}/${uid}`), {
      ...data,
    }).catch((error) => ({ error }));
  } else {
    res = await push(ref(database,collection), data).catch((error) => ({ error }));
  }

  if (res?.error) {
    return { error: buildError(res.error) };
  }
  return res;
};

/**
 *
 * @param {string} collection
 * @param {string} uid
 */
const deleteData = async (collection, uid) => {
  await ref(database, `${collection}/${uid}`).remove();
};

export {
  app,
  auth,
  database,
  login,
  register,
  logout,
  getUser,
  userAuthState,
  createOrUpdateData,
  deleteData,
  findOne,
  findMany,
};
