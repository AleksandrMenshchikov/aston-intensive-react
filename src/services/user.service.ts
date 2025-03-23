import fakeServer from '../backend/api/fakeServer';
import { FilmId } from '../types/Film';
import handleError from '../utils/handleError';
import { User } from './../types/User';

const userService: UserService = {
  async getUserInfo(id: string) {
    try {
      const result = await fakeServer.getUserById(id);
      return result;
    } catch (err) {
      handleError(err);
      return null;
    }
  },
  async updateUser<UserPayload extends Partial<User>>(
    id: string,
    payload: UserPayload
  ) {
    try {
      const result = await fakeServer.updateUser(id, payload);
      return result;
    } catch (err) {
      handleError(err);
      return null;
    }
  },
  async deleteUser() {},
  async addFavorite(id: string, film: string) {
    //TODO Тут не к месту. Перенести в стейт-менеджемент.
    try {
      const user = await this.getUserInfo(id);
      if (!user) return null;

      const { favorites } = user;
      const updatedFavorites = { favorites: [...favorites, film] };
      const result = await fakeServer.updateUser(id, updatedFavorites);

      return result;
    } catch (err) {
      handleError(err);
      return null;
    }
  },
};

export type UserService = {
  getUserInfo: (id: string) => Promise<User | null>;
  updateUser: <UserPayload extends Partial<User>>(
    id: string,
    payload: UserPayload
  ) => Promise<UserPayload | null>;
  deleteUser: () => void;
  addFavorite: (
    id: string,
    film: string
  ) => Promise<{ favorites: FilmId[] } | null>;
};

export default userService;
