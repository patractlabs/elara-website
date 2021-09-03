import React, { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { apiFetchMenuList } from '../data/api'
import { useApi } from '../hooks/useApi'
import { Menu, NetworkType, chainIconMap } from '../types/classes/chain'

const DashboardContext: React.Context<{
  chains: Menu
  updateMenu: () => void
  collapse: NetworkType[]
  toggleCollapse: (type: NetworkType) => void
}> = React.createContext({} as any)
interface Props {
  children: React.ReactNode
}

const DashboardProvider = (props: Props): React.ReactElement<Props> => {
  const [chains, setChains] = useState<Menu>({} as Menu)
  const [collapse, setCollapse] = useState<NetworkType[]>([])
  const location = useLocation()
  const { user } = useApi()

  const updateMenu = useCallback(() => {
    apiFetchMenuList(user.id).then((_chains) => {
      setChains(_chains)
    })
  }, [user.id])

  const toggleCollapse = (type: NetworkType) => {
    const idx = collapse.indexOf(type)
    if (idx > -1) {
      collapse.splice(idx, 1)
    } else {
      collapse.push(type)
    }
    setCollapse(collapse.slice())
  }

  useEffect(() => {
    const chain = location.pathname.split('/')[3] as keyof typeof chainIconMap

    for (let type in chains) {
      const selectedChainInfo = chains[type].find((info) => info.name === chain)
      if (
        selectedChainInfo &&
        collapse.indexOf(selectedChainInfo.network) === -1
      ) {
        collapse.push(selectedChainInfo.network)
        setCollapse(collapse.slice())
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, chains])

  useEffect(() => {
    updateMenu()
  }, [updateMenu])

  return (
    <DashboardContext.Provider
      value={{
        chains,
        updateMenu,
        collapse,
        toggleCollapse,
      }}
    >
      {props.children}
    </DashboardContext.Provider>
  )
}

export { DashboardContext, DashboardProvider }
