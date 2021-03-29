import { User } from './../types/classes/user';
import { ApiProps } from './../types/classes/api';
import { useState } from "react";

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

  return {
    isLogged,
    setIsLoggged,
    user,
    setUser,
  };
}
