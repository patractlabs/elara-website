import React, { useState } from 'react';
import { useUser } from '../hooks/useUser';
import { ApiContext } from './api-context';

interface Props {
  children: React.ReactNode;
}

export const ApiProvider = React.memo(({ children }: Props): React.ReactElement<Props> =>  {
  const user = useUser();
  const [ height, setHeight ] = useState(0);
  const [ updateProjectCountsSignal, setUpdateProjectCountsSignal ] = useState(0);

  return <ApiContext.Provider value={{
    ...user,
    homeHeight: { height, setHeight },
    updateProjectCountsSignal,
    setUpdateProjectCountsSignal,
  }} >{children}</ApiContext.Provider>;
});
