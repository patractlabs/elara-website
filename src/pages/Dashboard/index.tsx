import './index.css'
import React, {
  useEffect,
  useMemo,
  useContext,
  FC,
  ReactElement,
  Fragment,
} from 'react'
import { Switch, Route, useHistory, useLocation, Link } from 'react-router-dom'
import Projects from '../Projects'
import Summary from '../Summary'
import { ChainName } from '../../core/enum'
import { DashboardContext } from '../../core/context/dashboard-context'
import DropdownSvg from '../../assets/dropdown.svg'
import DashboardSvg from '../../assets/dashboard.svg'
import { useTranslation } from 'react-i18next'
import {
  Chain,
  NetworkType,
  chainIconMap,
  subMenuMap,
} from '../../core/types/classes/chain'


const CollapsedChains: FC<{
  type: NetworkType
  chains: Chain[]
}> = ({ type, chains }): ReactElement => {
  const location = useLocation()
  const history = useHistory()
  const { t } = useTranslation()
  const { collapse, setCollapse } = useContext(DashboardContext)
  
  const choosedChain = useMemo(() => {
    const paths = location.pathname.split('/')
    let chainName: string = ''
    if (location.pathname.startsWith('/dashboard/summary')) {
      chainName = 'summary'
    } else if (location.pathname.startsWith('/dashboard/projects')) {
      chainName = paths[3]
    }
    return chainName
  }, [location.pathname])

  const toggleCollapse = () => {
    const idx = collapse.indexOf(type)
    if (idx > -1) {
      collapse.splice(idx, 1)
    } else {
      collapse.push(type)
    }
    setCollapse(collapse.slice())
  }

  const renderIcon = () => {
    const Icons = subMenuMap[type].icon
    return <Icons collapse={collapse.indexOf(type) < 0} />
  }  

  return (
    <Fragment>
      <div className="chain-type" onClick={toggleCollapse}>
        <div className="chain-type-title">
          {renderIcon()}
          <span>{t(subMenuMap[type]['title'])}</span>
          <img
            src={DropdownSvg}
            alt=""
            style={{
              transform:
                collapse.indexOf(type) > -1 ? 'scaleY(1)' : 'scaleY(-1)',
            }}
          />
        </div>
        {collapse.indexOf(type) > -1 && (
          <ul className="project-list">
            {chains.map((chain) => (
              <li
                key={chain.name}
                className={`
              project-item
              ${choosedChain === chain.name ? 'project-item-active' : ''}
              ${chain.status}
              `}
                onClick={(e) => {
                  e.stopPropagation()
                  // 请求数据
                  history.push(`/dashboard/projects/${chain.name}/`)
                }}
              >
                <img src={chainIconMap[chain.name]} alt="" />
                <div className="project-item-main">
                  <span>{chain.name}</span>
                  {!!chain.count && (
                    <div
                      className={
                        choosedChain === chain.name
                          ? 'project-counts project-counts-active'
                          : 'project-counts project-counts-default'
                      }
                    >
                      {chain.count}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Fragment>
  )
}

const Dashboard: FC = (): ReactElement => {
  const location = useLocation()
  const { chains } = useContext(DashboardContext)
  const { t } = useTranslation()
  const history = useHistory()

  const renderMenu = () => {
    const types = Object.keys(subMenuMap) as NetworkType[]
    
    return (
      <div>
        {types.map((type) => {
          return chains[type] ? <CollapsedChains
            type={type}
            chains={chains[type] as Chain[]}
            key={type}
          /> : null
        })}
      </div>
    )
  }

  /** redirect to default chain's projects */
  useEffect(() => {
    if (
      location.pathname === '/dashboard/projects/' ||
      location.pathname === '/dashboard/projects'
    ) {
      history.push(`/dashboard/projects/${ChainName.Polkadot}`)
    }
  }, [location.pathname, history])

  return (
    // animated fadeInLeft
    <div className="dashboard">
      <div className="sider">
        <Link
          className={`sidebar-title ${
            location.pathname === '/dashboard/summary' && 'active'
          }`}
          to="/dashboard/summary"
        >
          <img src={DashboardSvg} alt="" />
          {t('dashboard')}
        </Link>
        {renderMenu()}
      </div>
      <div className="content">
        <Switch>
          <Route path="/dashboard/projects/:chain" component={Projects}></Route>
          <Route path="/dashboard/summary" component={Summary}></Route>
        </Switch>
      </div>
    </div>
  )
}

export default Dashboard
