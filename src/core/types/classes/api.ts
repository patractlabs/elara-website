import { User } from './user';

export class ApiProps {
    isLogged: boolean;
    setIsLoggged: (_: boolean) => void;
    user: User;
    setUser: (_: User) => void;
} 