import { UserState } from '../redux/slices/userSlice';
import { UserId } from './User';

export type GlobalState = {
  auth: UserId;
  user: UserState;
};
