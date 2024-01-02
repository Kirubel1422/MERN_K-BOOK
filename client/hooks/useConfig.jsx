import { useAuthContext } from "./useAuthContext";
export const useConfig = () => {
  const { user } = useAuthContext();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };
  return { config };
};
