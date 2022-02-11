import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import { login } from "../services/api/handlers/auth";
import { LoginUserInput } from "../services/validation";

interface AuthContextType {
  token: string;
  logInUser: (user: LoginUserInput) => void;
  logOutUser: () => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  let location = useLocation();

  const [token, setToken] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // @ts-ignore
  const from = location.state?.from?.pathname || "/";

  // On mount, check if there is a token in localStorage and set it
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setToken(token);

      navigate(from, { replace: true });
    }
  }, []);

  // Login user and set token in localStorage
  async function logInUser(body: LoginUserInput) {
    try {
      setError(null);

      const { data } = await login(body);

      setToken(data.token);

      localStorage.setItem("token", data.token);

      // From react-router docs:
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      navigate(from, { replace: true });
    } catch (error) {
      let errorMessage = "Error: ";

      if (axios.isAxiosError(error) && error.response) {
        errorMessage += error.response.data.non_field_errors[0];
      }
      setError(errorMessage);
    }
  }

  // Logout user and remove token from localStorage
  function logOutUser() {
    setToken("");

    localStorage.removeItem("token");

    navigate("/login");
  }

  return (
    <AuthContext.Provider
      value={{ token, logInUser, logOutUser, error, setError }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
