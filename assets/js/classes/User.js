export class User {
  constructor(
    props = {
      uid: null,
      firstName,
      lastName,
      email,
      password, // Do not save this to the database
      photoUrl,
    }
  ) {
    return Object.assign(this, props);
  }
}
