import { createContext } from "react";

export const UserContext = createContext({
  user: {
    accessToken: undefined,
    username: undefined,
    email: undefined,
    isManager: false,
  },
  updateUser: () => {},
});
