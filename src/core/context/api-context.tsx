import React from 'react';
import { ApiProps } from '../types/classes/api';

const ApiContext: React.Context<ApiProps> = React.createContext({} as any);

export { ApiContext };
