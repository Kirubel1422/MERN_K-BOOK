import axios from "axios";
import { useState } from "react";
import { useConfig } from "./useConfig";

import { usePost } from "./usePost";

export const useDeletePost = (id) => {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const { config } = useConfig();

  const { dependency } = usePost();

  const URL = "http://localhost:3000/api/posts/";

  const deleteHandler = async (id) => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await axios.delete(URL + id, config);
      setIsLoading(false);
      dependency(isLoading);
    } catch (error) {
      setError(error.response);
      setIsLoading(false);
    }
  };
  return { deleteHandler, error, isLoading };
};
