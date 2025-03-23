import { User, UserId } from './../../types/User';
import generateUniqId from '../../utils/generateUniqId';
import { Film } from '../../types/Film';

const fakeServer = {
  USER_COLLECTION_NAME: 'users',

  async signUp(email: string, password: string): Promise<UserId> {
    const methodError = 'При попытке зарегистрировать пользователя произошла ошибка: ';
    if (!email.trim() || !password.trim()) throw new Error(methodError + 'Некоторые поля пустые');

    const newUser: User = {
      email,
      password,
      favorites: [],
      history: [],
      _id: generateUniqId(),
    };
    const rawData = localStorage.getItem(this.USER_COLLECTION_NAME);
    const userCollection: User[] = rawData ? JSON.parse(rawData) : [];
    const isUserExists = userCollection.some((u) => u.email === email);

    if (isUserExists) throw new Error(methodError + `Пользователь ${email} уже существует`);

    userCollection.push(newUser);
    localStorage.setItem(this.USER_COLLECTION_NAME, JSON.stringify(userCollection));

    return newUser._id;
  },
  async singInWithPassword(email: string, password: string): Promise<UserId> {
    const credentialsError = 'Неверный логин или пароль';
    if (!email.trim() || !password.trim()) throw new Error(credentialsError);

    const lookupResults = localStorage.getItem('users');
    if (!lookupResults) throw new Error(credentialsError);

    const userCollection: User[] = JSON.parse(lookupResults);
    const currentUser = userCollection.find((user) => user.email === email);
    if (!currentUser || currentUser.password !== password) throw credentialsError;

    return currentUser._id;
  },
  async updateUser<UserPayload extends Partial<User>>(id: string, payload: UserPayload) {
    const methodError = 'При попытке обновить пользователя произошла ошибка: ';
    const user = getUserByIdFromLS(id);

    if (!user) throw new Error(methodError + `Пользователь с id ${id} не найден`);

    const updatedUser = { ...user, ...payload };

    const rawData = localStorage.getItem(this.USER_COLLECTION_NAME);
    if (!rawData) throw new Error(methodError + 'Ни один пользователь не найден');

    const userCollection: User[] = JSON.parse(rawData);
    const userIndex = userCollection.findIndex((user) => user._id === id);

    userCollection.splice(userIndex, 1, updatedUser);
    localStorage.setItem(this.USER_COLLECTION_NAME, JSON.stringify([...userCollection]));

    return payload;
  },
  async getUserById(id: string): Promise<User> {
    const result = getUserByIdFromLS(id);
    if (!result) throw new Error(`Пользователь с id ${id} не найден`);

    return result;
  },
  async getFilmList(url: string, options: HTTPRequestOptions) { //TODO Заменить на createApi или удалить
    const response = await fetch(url, options);
    const result = JSON.parse(await response.text());

    if (!result.results) throw new Error('Список фильмов не получен с сервера');
    return result.results as Film[];
  },
};

export default fakeServer;

export type HTTPRequestOptions = {
  method: string;
  headers: { [key: string]: string; };
};

function getUserByIdFromLS(id: string) {
  const rawData = localStorage.getItem('users');
  if (!rawData) return null;

  const usersEntries = JSON.parse(rawData);
  const users = Object.values(usersEntries) as User[];

  const user = users.find((u) => u._id === id);
  if (!user) return null;

  return user;
}