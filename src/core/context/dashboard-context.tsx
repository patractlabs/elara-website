import React, { useCallback, useEffect, useState } from 'react'
// import { ChainName } from '../enum'
// import { Project } from '../../core/types/classes/project'
import { apiFetchMenuList } from '../data/api'
import { useApi } from '../hooks/useApi'
import { Menu } from '../types/classes/chain'

const DashboardContext: React.Context<{
  chains: Menu
  update: () => void
  collapse: any[]
  setCollapse: React.Dispatch<React.SetStateAction<any>>
}> = React.createContext({} as any)
interface Props {
  children: React.ReactNode
}

const DashboardProvider = React.memo(
  ({ children }): React.ReactElement<Props> => {
    const [chains, setChains] = useState<Menu>({} as Menu)
    const [updateSignal, setUpdateSignal] = useState<number>(0)
    const [collapse, setCollapse] = useState([])
    const { user } = useApi()
    useEffect(() => {
      apiFetchMenuList(user.id).then((_chains) => {
        setChains(_chains)
      })
    }, [setChains, updateSignal])

    const update = useCallback(
      () => setUpdateSignal(updateSignal + 1),
      [setUpdateSignal, updateSignal]
    )

    return (
      <DashboardContext.Provider
        value={{
          chains,
          update,
          collapse,
          setCollapse,
        }}
      >
        {children}
      </DashboardContext.Provider>
    )
  }
)

export { DashboardContext, DashboardProvider }
