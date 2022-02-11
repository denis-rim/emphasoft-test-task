import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginUserInput, loginUserSchema } from "../services/validation";
import { useAuth } from "../state/state";

import styles from "./LoginPage.module.css";

function LoginPage() {
  const { logInUser, error } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginUserInput>({
    resolver: zodResolver(loginUserSchema),
  });

  async function onSubmit(values: LoginUserInput) {
    logInUser(values);
  }

  return (
    <div className={styles.container}>
      <div className={styles.forms}>
        <p style={{ color: "red", padding: "0.5rem" }}>{error}</p>
        <div className={styles.login}>
          <span className={styles.title}>Login</span>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputField}>
              <label htmlFor="username" />
              <input
                className={styles.loginInput}
                id="username"
                type="text"
                placeholder="Enter your username"
                required
                defaultValue="username"
                {...register("username")}
              />
              <p>{errors.username?.message}</p>
            </div>

            <div className={styles.inputField}>
              <label htmlFor="password" />
              <input
                className={styles.loginInput}
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
                defaultValue="******"
                {...register("password")}
              />
              <span
                className={styles.showPassword}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
              <p>{errors.password?.message}</p>
            </div>

            <button type="submit" className={styles.loginButton}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
