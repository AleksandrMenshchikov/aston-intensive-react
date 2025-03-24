import { UserId } from '../types/User';

const tokenService = {
  setAuth(id: UserId) {
    localStorage.setItem('auth', id);
  },
  getAuth() {
    const authValue = localStorage.getItem('auth');
    if (authValue) return JSON.parse(authValue) as UserId;
  },
  clearAuth() {
    localStorage.removeItem('auth');
  },
};

export default tokenService;
