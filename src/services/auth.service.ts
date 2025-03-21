import fakeServer, { ErrorMessage } from '../backend/api/fakeServer';

const authService = {
  async signUp(email: string, password: string): Promise<string | null> {
    return fakeServer.signUp(email, password);
  },
  async signInWithPassword(
    email: string,
    password: string
  ): Promise<string | ErrorMessage> {
    return fakeServer.singInWithPassword(email, password);
  },
};

export default authService;
