import { object, string, TypeOf } from "zod";

export const loginUserSchema = object({
  username: string()
    .min(1, "Username too short - should be 1 chars minimum")
    .nonempty({
      message: "Username is required",
    }),
  password: string()
    .min(1, "Password too short - should be 1 chars minimum")
    .nonempty({
      message: "Password is required",
    }),
});

export type LoginUserInput = TypeOf<typeof loginUserSchema>;
