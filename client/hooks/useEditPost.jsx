import axios from "axios";
import { useState } from "react";
import { useConfig } from "./useConfig";

export const useEditPost = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const URL = "http://localhost:3000/api/posts/";

  const { config } = useConfig();

  const editHandler = async (id, content) => {
    setError(null);
    setIsLoading(false);
    try {
      const response = await axios.put(URL + id, { content: content }, config);
      setIsLoading(false);
    } catch (error) {
      setError(error.response.data.error);
      setIsLoading(false);
    }
  };
  return { isLoading, error, editHandler };
};
