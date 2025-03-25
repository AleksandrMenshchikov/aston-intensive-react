import { UserId } from '../types/User';

const tokenService = {
  setAuth(id: UserId) {
    localStorage.setItem('auth', id);
  },
  getAuth() {
    return localStorage.getItem('auth') as UserId;
  },
  clearAuth() {
    localStorage.removeItem('auth');
  },
};

export default tokenService;
