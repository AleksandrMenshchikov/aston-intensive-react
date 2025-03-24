import { UserId } from '../types/User';

const tokenService = {
  setAuth(id: UserId) {
    localStorage.setItem('auth', id);
  },
  getAuth() {
    const authValue = localStorage.getItem('auth');
    if (authValue) return JSON.parse(authValue);
  },
  removeAuth() {
    localStorage.setItem('auth', '');
  },
};

export default tokenService;
