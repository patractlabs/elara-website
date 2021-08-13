import { User } from "./../types/classes/user";
import { useCallback, useState } from "react";
import { apiLogin } from "../data/api";

let _isLogged = false;
if (document.cookie.includes("sid")) {
  _isLogged = true;
}

export const useUser = () => {
  const [isLogged, setIsLoggged] = useState<boolean>(_isLogged);
  const [user, setUser] = useState<User>({
    id: "",
    name: "",
    projectNum: 0,
    maxProjectNum: 0,
    level: ''
  });

  const updateUser = useCallback(() => {
    return apiLogin().then((_user) => {
      setIsLoggged(true);
      setUser(_user);
      localStorage.setItem("user", JSON.stringify(_user));
    });
  }, []);

  return {
    isLogged,
    setIsLoggged,
    user,
    setUser,
    updateUser,
  };
};
