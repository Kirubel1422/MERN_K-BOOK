import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (formData) => {
    setIsLoading(true);
    setError(null);
    const URL = "http://localhost:3000/account/login";
    try {
      const response = await axios.post(URL, formData);
      setIsLoading(false);
      dispatch({ type: "LOGIN", payload: response.data });
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      if (error.response.status === 401) {
        setError(error.response.data.error);
      }
      setIsLoading(false);
    }
  };
  return { error, isLoading, login };
};
export default useLogin;
