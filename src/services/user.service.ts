import { UserData } from './../types/User';

const userService: UserService = {
  getUserInfo(id: string): Promise<UserData> {
    return new Promise((res, rej) => {
      setTimeout(() => {
        try {
          const data = localStorage.getItem('user');
          if (!data) return null;

          const user = JSON.parse(data).find((u: UserData) => u._id === id);
          if (!user) return null;

          res(user);
        } catch (err) {
          rej(err);
        }
      });
    });
  },
};

export type UserService = {
  getUserInfo: (id: string) => Promise<UserData>;
};

export default userService;
