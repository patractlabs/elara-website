
import React from 'react';
import { useHomeHeight } from '../hooks/useHomeHeight';
import { useUser } from '../hooks/useUser';
import { ApiContext } from './api-context';

interface Props {
  children: React.ReactNode;
}

export const ApiProvider = React.memo(({ children }: Props): React.ReactElement<Props> =>  {
  const user = useUser();
  const homeHeight = useHomeHeight();
  return <ApiContext.Provider value={{ ...user, homeHeight }} >{children}</ApiContext.Provider>;
});
