import { User } from './../types/classes/user'
import { useCallback, useState } from 'react'
import { apiLogin } from '../data/api'
import { getCookie } from '../../shared/utils'

let _isLogged = false

if (getCookie('sid')) {
  _isLogged = true
}

export const useUser = () => {
  const userData = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : {
        id: 0,
        name: '',
        projectNum: 0,
        maxProjectNum: 0,
        level: '',
      }
  const [isLogged, setIsLoggged] = useState<boolean>(_isLogged)
  const [user, setUser] = useState<User>(userData)

  const updateUser = useCallback(() => {
    return apiLogin().then((_user) => {
      setIsLoggged(true)
      setUser(_user)
      localStorage.setItem('user', JSON.stringify(_user))
    })
  }, [])

  return {
    isLogged,
    setIsLoggged,
    user,
    setUser,
    updateUser,
  }
}
