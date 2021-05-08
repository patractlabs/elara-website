import "./index.css";
import React, { useEffect, useMemo, useContext, FC, ReactElement } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import Projects from "../Projects";
import Details from "../Details";
import { ChainName } from '../../core/enum';
import { DashboardContext } from '../../core/context/dashboard-context';
import DropdownSvg from '../../assets/dropdown.svg';
import { useTranslation } from 'react-i18next';
import { Chain } from '../../core/types/classes/chain';

const CollapsedChains: FC<{
  title: string;
  collapse: boolean;
  toggleCollapse: React.Dispatch<React.SetStateAction<boolean>>;
  choosedChain: string;
  chains: Chain[];
}> = ({
  collapse,
  toggleCollapse,
  title,
  choosedChain,
  chains,
}): ReactElement => {
  const history = useHistory();

  return (
    <div>
      <div className="chain-type" onClick={() => toggleCollapse(!collapse)}>
        <span>{title}</span>
        <img src={DropdownSvg} alt="" style={{ transform: collapse ? 'scaleY(1)' : 'scaleY(-1)' }} />
      </div>
      {
        !collapse &&
          <ul className="project-list">
            {
              chains.map(chain => 
                <li
                  key={chain.name}
                  className={ choosedChain === chain.name ? 'project-item project-item-active' : 'project-item' }
                  onClick={ () => history.push(`/dashboard/projects/${chain.name}`) }
                >
                  <img src={ chain.img } alt="" />
                  <div className="project-item-main">
                    <span>{ chain.title }</span>
                    {
                      !!chain.count &&
                        <div
                          className={
                            choosedChain === chain.name ?
                              'project-counts project-counts-active' : 'project-counts project-counts-default'
                          }
                        >
                          { chain.count }
                        </div>
                    }
                  </div>
                </li>
              )
            }
          </ul>
      }
    </div>
  );
};

const Dashboard: FC = (): ReactElement => {
  const location = useLocation();
  const { update, chains, liveCollapse, setLiveCollapse, testCollapse, setTestCollapse } = useContext(DashboardContext);
  const { t } = useTranslation();
  const history = useHistory();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => update(), []);

  /** redirect to default chain's projects */
  useEffect(() => {
    if (location.pathname === '/dashboard/projects/' || location.pathname === '/dashboard/projects') {
      history.push(`/dashboard/projects/${ChainName.Polkadot}`);
    }
  }, [location.pathname, history]);

  const choosedChain = useMemo(() => {
    const paths = location.pathname.split('/');
    let chainName: string = ChainName.Polkadot;
    if (location.pathname.startsWith('/dashboard/details') && paths[3]) {
      chainName = paths[3];
    } else if (location.pathname.startsWith('/dashboard/projects') && paths[3]) {
      chainName = paths[3];
    }
    return chainName;
  }, [location.pathname]);
  
  return (
    // animated fadeInLeft
    <div className="dashboard">
      <div className="sider">
        <CollapsedChains
          title={t('LIVE NETWORKS')}
          collapse={liveCollapse}
          toggleCollapse={setLiveCollapse}
          choosedChain={choosedChain}
          chains={chains.filter(chain => chain.liveNetwork)}
        />
        <CollapsedChains
          title={t('TEST NETWORKS')}
          collapse={testCollapse}
          toggleCollapse={setTestCollapse}
          choosedChain={choosedChain}
          chains={chains.filter(chain => !chain.liveNetwork)}
        />
      </div>
      <div className="content">
        <Switch>
          <Route path="/dashboard/projects/:chain" component={Projects}></Route>
          <Route path="/dashboard/details/:chain/:projectId" component={Details}></Route>
        </Switch>
      </div>
    </div>
  );
};

export default Dashboard;
