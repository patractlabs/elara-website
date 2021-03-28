import "./index.css";
import React, { useState, createContext, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Projects from "../Projects";
import Details from "../Details";
import img1 from '../../assets/Polkadot.svg';
import img2 from '../../assets/Kusama.svg';
import img3 from '../../assets/Jupiter.svg';
import img4 from '../../assets/Rococo.svg';
import img5 from '../../assets/Darwinia.png';
import img6 from '../../assets/Dock.svg';
import img7 from '../../assets/Edgeware.svg';
import img8 from '../../assets/Kulupu.svg';
import img9 from '../../assets/Nodle.svg';
import img10 from '../../assets/Plasm.png';
import img11 from '../../assets/Stafi.png';
import img12 from '../../assets/Mandala.svg';
import img13 from '../../assets/ChainX.png';
import { apiGetProjectList } from '../../core/data/api';
import { Project } from '../../core/types/classes/project';
import { ChainName } from '../../core/enum';

export const CountContext = createContext(1);

interface Chain {
  name: string;
  img: any;
  count: number;
} 

const chainNames = [
  ChainName.Polkadot,
  ChainName.Kusama,
  ChainName.Jupiter,
  ChainName.Rococo,
  ChainName.Darwinia,
  ChainName.Dock,
  ChainName.Edgeware,
  ChainName.Kulupu,
  ChainName.Nodle,
  ChainName.Plasm,
  ChainName.Stafi,
  ChainName.Mandala,
];

const getChains = (projects: Project[] = []): Chain[] => {
  const chainsMap: {
    [key: string]: { img: any, count: number }
  } = {
    Polkadot: {
      img: img1,
      count: 0,
    },
    Kusama: {
      img: img2,
      count: 0,
    },
    Jupiter: {
      img: img3,
      count: 0,
    },
    Rococo: {
      img: img4,
      count: 0,
    },
    Darwinia: {
      img: img5,
      count: 0,
    },
    Dock: {
      img: img6,
      count: 0,
    },
    Edgeware: {
      img: img7,
      count: 0,
    },
    Kulupu: {
      img: img8,
      count: 0,
    },
    Nodle: {
      img: img9,
      count: 0,
    },
    Plasm: {
      img: img10,
      count: 0,
    },
    Stafi: {
      img: img11,
      count: 0,
    },
    Mandala: {
      img: img12,
      count: 0,
    },
  };

  projects.forEach(project => chainsMap[project.chain].count ++);

  const chains: Chain[] = [];
  chainNames
    .filter(chainName => !!chainsMap[chainName].count)
    .forEach(chainName => chains.push({
      name: chainName,
      ...chainsMap[chainName],
    }));
  chainNames
    .filter(chainName => !chainsMap[chainName].count)
    .forEach(chainName => chains.push({
      name: chainName,
      ...chainsMap[chainName],
    }));

  return chains;
};

const Dashboard: React.FC = () => {
  const [ chains, setChains ] = useState<Chain[]>(getChains());
  const history = useHistory();

  useEffect(() => {
    apiGetProjectList().then(projects => {
      console.log(projects, 'projects');
      setChains(getChains(projects));
    }, () => {});
  }, [setChains]);

  return (
    // animated fadeInLeft
    <div className="dashboard">
      <div className="sider">
        <ul className="project-list">
          {
            chains.map(chain => 
              <li key={chain.name} className="project-item" onClick={ () => history.push(`/dashboard/projects/${chain.name}`) }>
                <img src={ chain.img } alt="" />
                <div className="project-item-main">
                  <span>{ chain.name }</span>
                  {
                    !!chain.count && <div className="project-counts">{ chain.count }</div>
                  }
                </div>
              </li>
            )
          }
        </ul>
      </div>
      <div className="content">
        <Switch>
          <Route path="/dashboard/projects/:chain" component={Projects}></Route>
          <Route path="/dashboard/details/:id" component={Details}></Route>
        </Switch>
      </div>
    </div>
  );
};

export default Dashboard;
