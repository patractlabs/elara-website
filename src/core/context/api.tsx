import React, { useState } from 'react';
import { useHomeHeight } from '../hooks/useHomeHeight';
import { useUser } from '../hooks/useUser';
import { ApiContext } from './api-context';

interface Props {
  children: React.ReactNode;
}

export const ApiProvider = React.memo(({ children }: Props): React.ReactElement<Props> =>  {
  const user = useUser();
  const homeHeight = useHomeHeight();
  const [ updateProjectCountsSignal, setUpdateProjectCountsSignal ] = useState(0);

  return <ApiContext.Provider value={{ ...user, homeHeight, updateProjectCountsSignal, setUpdateProjectCountsSignal }} >{children}</ApiContext.Provider>;
});
