
import React from 'react';
import { useUser } from '../hooks/useUser';
import { ApiContext } from './api-context';

interface Props {
  children: React.ReactNode;
}

export const ApiProvider = React.memo(({ children }: Props): React.ReactElement<Props> =>  {
  const user = useUser();
  return <ApiContext.Provider value={ user } >{children}</ApiContext.Provider>;
});
