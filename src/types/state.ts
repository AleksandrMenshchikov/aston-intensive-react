import { UserState } from '../redux/slices/user.slice';
import { UserId } from './User';

export type GlobalState = {
  auth: UserId;
  user: UserState;
};
