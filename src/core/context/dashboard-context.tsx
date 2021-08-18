import React, { useCallback, useEffect, useState } from 'react'
import { apiFetchMenuList } from '../data/api'
import { useApi } from '../hooks/useApi'
import { Menu } from '../types/classes/chain'

const DashboardContext: React.Context<{
  chains: Menu
  updateMenu: () => void
  collapse: string[]
  setCollapse: React.Dispatch<React.SetStateAction<string[]>>
}> = React.createContext({} as any)
interface Props {
  children: React.ReactNode
}

const DashboardProvider = React.memo(
  ({ children }): React.ReactElement<Props> => {
    const [chains, setChains] = useState<Menu>({} as Menu)
    const [collapse, setCollapse] = useState<string[]>([])
    const { user } = useApi()

    const updateMenu = useCallback(() => {
      apiFetchMenuList(user.id).then((_chains) => {
        setChains(_chains)
      })
    }, [user.id])

    useEffect(() => {
      updateMenu()
    }, [updateMenu])

    

    return (
      <DashboardContext.Provider
        value={{
          chains,
          updateMenu,
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
