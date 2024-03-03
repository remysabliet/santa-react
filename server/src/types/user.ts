export interface IUser {
  uid: string;
  username: string;
}

export interface IUserProfile {
  userUid: string; // uid
  address: string;
  birthdate: string; // format 'YYYY/MM/DD'
}
