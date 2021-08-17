import { User } from "./../types/classes/user";
import {useEffect, useCallback, useState } from "react";
import { apiLogin } from "../data/api";
import {getCookie} from '../../shared/utils'

let _isLogged = false;

if (getCookie('sid')) {
  _isLogged = true
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

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      setUser(JSON.parse(user))
    }
  }, [])

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
