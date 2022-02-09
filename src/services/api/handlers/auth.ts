import { api } from "../client";
import { LoginUserInput } from "../../validation";

interface UserLoginResponse {
  token: string;
}

export const login = (body: LoginUserInput) => {
  return api.post<LoginUserInput, { data: UserLoginResponse }>(
    "/api-token-auth/",
    body
  );
};
