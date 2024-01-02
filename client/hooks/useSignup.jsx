import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (formData) => {
    const URL = "http://localhost:3000/account/signup";
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(URL, formData);
      dispatch({ type: "LOGIN", payload: response.data });
      localStorage.setItem("user", JSON.stringify(response.data));
      setIsLoading(false);
    } catch (error) {
      if (error.response.status === 401) {
        setError(error.response.data.error);
      }
      setIsLoading(false);
    }
  };
  return { error, isLoading, signup };
};
export default useSignup;
