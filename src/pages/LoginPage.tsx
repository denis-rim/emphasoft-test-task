import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginUserInput, loginUserSchema } from "../services/validation";
import { login } from "../services/api/handlers/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | undefined>(undefined);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginUserInput>({
    resolver: zodResolver(loginUserSchema),
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/users");
    }
  }, []);

  async function onSubmit(values: LoginUserInput) {
    try {
      const response = await login(values);

      localStorage.setItem("token", response.data.token);

      navigate("/users");
    } catch (error) {
      let errorMessage = "Error: ";

      if (axios.isAxiosError(error) && error.response) {
        errorMessage += error.response.data.non_field_errors[0];
      }
      setLoginError(errorMessage);
    }
  }

  return (
    <section>
      <p>{loginError}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-element">
          <label htmlFor="username" />
          <input
            id="username"
            type="text"
            placeholder="username"
            defaultValue="test_super"
            {...register("username")}
          />
          <p>{errors.username?.message}</p>
        </div>

        <div className="form-element">
          <label htmlFor="password" />
          <input
            id="password"
            type="password"
            placeholder="********"
            defaultValue="Nf<U4f<rDbtDxAPn"
            {...register("password")}
          />
          <p>{errors.password?.message}</p>
        </div>
        <button>Submit</button>
      </form>
    </section>
  );
}

export default LoginPage;
