import { UserData } from './../../types/User';
import generateUniqId from '../../utils/generateUniqId';
import makeAsyncOperation from '../../utils/makeAsyncOperation';
import { Film } from '../../types/Film';

const fakeServer = {
  USER_COLLECTION_NAME: 'users',

  async signUp(email: string, password: string): Promise<string | null> {
    if (email.trim() && password.trim()) {
      const user = {
        email,
        password,
        favorites: [],
        _id: generateUniqId(),
      };
      const result = (await makeAsyncOperation(() => {
        localStorage.setItem('users', JSON.stringify({ [user._id]: user }));
        return user._id;
      })) as string;

      if (!result) return null;
      return result;
    } else {
      return new Promise((res) => {
        setTimeout(() => res(null));
      });
    }
  },
  async singInWithPassword(
    email: string,
    password: string
  ): Promise<string | ErrorMessage> {
    const credentialsError = { error: 'Неверный логин или пароль' };
    if (!email.trim() || !password.trim())
      return (await makeAsyncOperation(() => credentialsError)) as ErrorMessage;

    const lookupResults = localStorage.getItem('users');
    if (!lookupResults)
      return (await makeAsyncOperation(() => credentialsError)) as ErrorMessage;

    const users = JSON.parse(lookupResults);
    const currentUser = Object.values(users as UserData[]).find(
      (user: UserData) => user.email === email
    );
    if (!currentUser || currentUser.password !== password)
      return (await makeAsyncOperation(() => credentialsError)) as ErrorMessage;

    return makeAsyncOperation(() => currentUser._id) as Promise<string>;
  },
  async updateUser(id: string, payload: UserData) {
    console.log(payload); //TODO Затычка для сейва. Убрать потом.
    const user = getUserByIdFromLS(id);
    if (!user) return { error: `Пользователь с id ${id} не найден` };

    // const newData = { ...user, ...payload };

    const rawUsers = localStorage.getItem(this.USER_COLLECTION_NAME);
    if (!rawUsers) return null;

    const users = JSON.parse(rawUsers) as UsersCollectionEntry[];
    console.log(users);

    // const usersCollection = Object.values(users);
  },
  async getUserById(id: string): Promise<UserData | ErrorMessage> {
    const result = getUserByIdFromLS(id);
    if (!result)
      return (await makeAsyncOperation(() => ({
        error: `Пользователь с id ${id} не найден`,
      }))) as ErrorMessage;

    return (await makeAsyncOperation(() => result)) as UserData;
  },
  async getFilmList(url: string, options: HTTPRequestOptions) {
    try {
      const response = await fetch(url, options);
      const textResult = await response.text();
      const result = JSON.parse(textResult);

      if (!result.results) return null;
      return result.results as Film[];
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

export default fakeServer;

export type ErrorMessage = {
  error: string;
};

function getUserByIdFromLS(id: string) {
  const rawData = localStorage.getItem('users');
  if (!rawData) return null;

  const users = JSON.parse(rawData);

  const user = JSON.parse(users).find((u: UserData) => u._id === id);
  if (!user) return null;

  return user;
}

export type HTTPRequestOptions = {
  method: string;
  headers: {
    [key: string]: string;
  };
};

type UsersCollectionEntry = {
  _id: UserData;
};
