import { User } from './../types/classes/user';
import { useCallback, useState } from "react";
import { apiLogin } from '../data/api';

let _isLogged = false;
if (document.cookie.includes("sid")) {
  _isLogged = true;
}

export const useUser = () => {
  const [isLogged, setIsLoggged] = useState<boolean>(_isLogged);
  const [ user, setUser ] = useState<User>({
    uid: '',
    username: '',
    vip: '',
    type: '',
    cratetime: '',
    ext: {
      projects: 0,
    },
  });

  const updateUser = useCallback(() => apiLogin().then(_user => {
      setIsLoggged(true);
      setUser(_user);
      localStorage.setItem("user", JSON.stringify(_user));
    })
  , []);

  return {
    isLogged,
    setIsLoggged,
    user,
    setUser,
    updateUser,
  };
}
