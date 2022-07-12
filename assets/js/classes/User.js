export class User {
  
  get fullName(){
    return `${this.firstName} ${this.lastName}`
  } 

  constructor(
    props = {
      uid: null,
      firstName,
      lastName,
      email,
      password, // Do not save this to the database
      photoUrl: 'https://picsum.photos/200/200',
    }
  ) {

    return Object.assign(this, props);
  }
}
