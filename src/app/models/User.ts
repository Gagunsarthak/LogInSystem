export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}
export interface loginuser {
  token: string;
  userId: Pick<User, "id">;
}
