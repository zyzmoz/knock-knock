import {
  database,
  userAuthState,
  createOrUpdateData,
} from "../integrations/firebase.js";
import {
  set,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";
import { User } from "../classes/User.js";

export const profileCtrl = async () => {
  let user;

  const userRef = ref(database, `users/${userAuthState?.uid}`);
  onValue(userRef, (snapshot) => {
    const data = snapshot.val();
    user = new User(data);
    user.firstName = data.firstName;
    profileName.innerHTML = user.fullName;
    profileFirstName.value = user.firstName;
    profileLastName.value = user.lastName;
    profileEmail.value = `${user.email}`;
  });

  profileFirstName.addEventListener('change', () => {
    onInputChanged()
  })

  profileLastName.addEventListener('change', () => {
    onInputChanged()
  })

  const onInputChanged = () => {
    profileName.innerHTML = `${profileFirstName.value} ${profileLastName.value}`;
  };

  profileSubmit.addEventListener("click", () => {
    createOrUpdateData("users", userAuthState?.uid, {
      ...user,
      firstName: profileFirstName.value,
      lastName: profileLastName.value,
      photoUrl: profilePhoto.src,
    });
  });
};
