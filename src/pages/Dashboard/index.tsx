import './index.css'
import {
  useEffect,
  useMemo,
  useContext,
  FC,
  ReactElement,
  Fragment,
} from 'react'
import {
  Switch,
  Route,
  useHistory,
  useLocation,
  Link,
  Redirect,
} from 'react-router-dom'
import Projects from '../Projects'
import Summary from '../Summary'
import { ChainName } from '../../core/enum'
import { DashboardContext } from '../../core/context/dashboard-context'
import DropdownSvg from '../../assets/dropdown.svg'
import DashboardIcon from '../../shared/components/svg/DashboardIcon'
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
  const { collapse, toggleCollapse } = useContext(DashboardContext)

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

  const renderIcon = () => {
    const Icons = subMenuMap[type].icon
    return <Icons collapse={collapse.indexOf(type) < 0} />
  }

  return (
    <Fragment>
      <div className="chain-type" onClick={() => toggleCollapse(type)}>
        <div className="chain-type-title">
          {renderIcon()}
          <span
            className={`category-title ${
              collapse.indexOf(type) > -1 ? 'active' : ''
            }`}
          >
            {t(subMenuMap[type]['title'])}
          </span>
          <img
            src={DropdownSvg}
            alt=""
            style={{
              transform:
                collapse.indexOf(type) > -1 ? 'scaleY(-1)' : 'scaleY(1)',
            }}
          />
        </div>
        <ul
          className={`project-list ${
            collapse.indexOf(type) > -1 ? 'active' : ''
          }`}
        >
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
                  <span className="project-counts">{chain.count}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
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
          return chains[type] ? (
            <CollapsedChains
              type={type}
              chains={chains[type] as Chain[]}
              key={type}
            />
          ) : null
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
            location.pathname === '/dashboard/summary' ? 'active' : ''
          }`}
          to="/dashboard/summary"
        >
          <DashboardIcon
            collapse={location.pathname !== '/dashboard/summary'}
          />
          {t('dashboard')}
        </Link>
        {renderMenu()}
      </div>
      <div className="content">
        <div className="notification">
          {t('notify1')}
          <span className="deadline">{t('notify2')}</span>
          {t('notify3')}
          {t('notify4')}
        </div>
        <Switch>
          <Route path="/dashboard/projects/:chain" component={Projects}></Route>
          <Route path="/dashboard/summary" component={Summary}></Route>
          <Redirect to="/dashboard/summary" />
        </Switch>
      </div>
    </div>
  )
}

export default Dashboard
