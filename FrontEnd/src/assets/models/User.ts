export interface UserNameEmail {
  name: string;
  email: string;
}

export interface User extends UserNameEmail {
  profilePhoto: string;
  token: string;
  description: string;
  major: string;
  schoolYear: string;
  phone: string;
}

export const dummyUser = {
  profilePhoto: '',
  name: '',
  email: '',
  token: '',
  description: '',
  major: '',
  schoolYear: '',
  phone: '',
};
