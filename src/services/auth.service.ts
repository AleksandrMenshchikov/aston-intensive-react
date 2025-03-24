import fakeServer from '../backend/api/fakeServer';
import { UserId } from '../types/User';

const authService = {
  async signUp({ email, password }: AuthPayload): Promise<UserId | null> {
    return fakeServer.signUp(email, password);
  },
  async signInWithPassword({ email, password }: AuthPayload): Promise<UserId> {
    return fakeServer.singInWithPassword(email, password);
  },
};

export default authService;

export type AuthPayload = { email: string, password: string };
