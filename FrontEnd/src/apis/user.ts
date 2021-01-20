import { User } from '../assets/models/User';
import { backendAPI } from './apiBases';

export interface UserLoginResponse extends Omit<User, 'token'> {
  access_token: string;
  message: string;
  profile_photo: string;
}

/**
 * Login a user to a session.
 * @param name - the user's name
 * @param email - the user's email
 * @returns - undefined if error occured, otherwise UserLoginResponse, which includes an access token,
 *            email, message, user, imageUrl
 */
const userLogIn = async (name: string, email: string) => {
  try {
    const response = await backendAPI.post<
      UserLoginResponse | { newUser: boolean }
    >('/login', JSON.stringify({ name, email }), {
      headers: {
        'content-type': 'application/json',
      },
      withCredentials: true,
    });

    if (response.request?.status !== 200) throw Error('Bad request');

    if ('newUser' in response.data) {
      // TODO find another way to do this
      console.log('NEW USER UH HUH, IN THE API UH HUH');
      return { newUser: true };
    }

    const data: User = {
      profilePhoto: response.data.profile_photo,
      name: response.data.name,
      email: response.data.email,
      token: response.data.access_token,
      description: response.data.description,
      major: response.data.major,
      schoolYear: response.data.schoolYear,
      phone: response.data.phone,
    };

    return data;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

// export interface UserLogoutResponse {
//   // TODO
// }

/**
 * Logout a user from a session.
 * @param token - the token for the user's session.
 * @returns - undefined if error occured, string result message otherwise
 */
const userLogOut = async (token: string) => {
  try {
    const response = await backendAPI.post<string>(
      '/logout',
      // eslint-disable-next-line @typescript-eslint/camelcase
      { access_token: token },
      {
        headers: {
          'content-type': 'application/json',
        },
        withCredentials: true,
      },
    );
    console.log(response);

    if (response.request?.status !== 200) throw Error('Bad request');
    return response.data;
  } catch (err) {
    console.error(`Logout error: ${err}`);
    return undefined;
  }
};

/**
 * Echo the edit of profile to backend.
 * @param kvPairs - key value pair for updates
 * @returns - undefined if error occured, otherwise UserLoginResponse, which includes an access token,
 *            email, message, user, imageUrl
 */
const userEditProfile = async (email: string, kvPairs: any) => {
  try {
    const response = await backendAPI.post(
      '/profile',
      JSON.stringify({ email, updates: kvPairs }),
      {
        headers: {
          'content-type': 'application/json',
        },
        withCredentials: true,
      },
    );
    if (response.request?.status !== 201) throw Error('Bad request');

    return response.data;
  } catch (err) {
    console.error(err, 'user edit profile fail');
    return undefined;
  }
};

/**
 * Create a new user.
 * @param user - the user info to create
 * @returns - undefined if error occured, otherwise UserLoginResponse, which includes an access token,
 *            email, message, user, imageUrl
 */
const createNewUserApi = async (user: Omit<User, 'token' | 'profilePhoto'>) => {
  try {
    const response = await backendAPI.post<UserLoginResponse>(
      '/createUser',
      // TODO JSON.stringify({ name, email }),
      user,
      {
        headers: {
          'content-type': 'application/json',
        },
        withCredentials: true,
      },
    );

    if (response.request?.status !== 201) throw Error('Bad request');

    return {
      profilePhoto: response.data.profile_photo,
      name: response.data.name,
      email: response.data.email,
      token: response.data.access_token,
      description: response.data.description,
      major: response.data.major,
      schoolYear: response.data.schoolYear,
      phone: response.data.phone,
    } as User;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

export { userLogIn, userLogOut, userEditProfile, createNewUserApi };
