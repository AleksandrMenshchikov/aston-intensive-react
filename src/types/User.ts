export type User = {
  readonly _id: string;
  email: string;
  password: string;
  name?: string;
  favorites: string[];
  history: string[];
};

export type UserId = User['_id'];