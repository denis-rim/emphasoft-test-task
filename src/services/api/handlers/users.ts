import { api } from "../client";

export interface UserModel {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  last_login: Date | null;
  is_superuser: boolean;
  password: string;
}

export type UserModelResponse = Omit<UserModel, "password">;

export const getAllUsers = (token: string) => {
  return api.get<null, { data: UserModelResponse[] }>("/api/v1/users/", {
    headers: {
      Authorization: `token ${token}`,
    },
  });
};
