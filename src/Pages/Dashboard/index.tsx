import "./index.css";
import React, { useState, createContext, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
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

export const CountContext = createContext(1);

interface Chain {
  name: string;
  img: any;
  count: number;
} 

const initialChains: Chain[] = [
  {
    name: 'Polkadot',
    img: img1,
    count: 0,
  },
  {
    name: 'Kusama',
    img: img2,
    count: 0,
  },
  {
    name: 'Jupiter',
    img: img3,
    count: 0,
  },
  {
    name: 'Rococo',
    img: img4,
    count: 0,
  },
  {
    name: 'Darwinia',
    img: img5,
    count: 0,
  },
  {
    name: 'Dock',
    img: img6,
    count: 0,
  },
  {
    name: 'Edgeware',
    img: img7,
    count: 0,
  },
  {
    name: 'Kulupu',
    img: img8,
    count: 0,
  },
  {
    name: 'Nodle',
    img: img9,
    count: 0,
  },
  {
    name: 'Plasm',
    img: img10,
    count: 0,
  },
  {
    name: 'Stafi',
    img: img11,
    count: 0,
  },
  {
    name: 'Mandala',
    img: img12,
    count: 0,
  },
];

const Dashboard: React.FC = () => {
  const [ chains, setChains ] = useState<Chain[]>(initialChains);

  useEffect(() => {
    
  }, []);

  return (
    // animated fadeInLeft
    <div className="dashboard">
      <div className="sider">
        <ul className="project-list">
          {
            chains.map(chain => 
              <li key={chain.name} className="project-item">
                <img src={ chain.img } alt="" />
                <span>{ chain.name }</span>
                <div className="project-counts">{ chain.count }</div>
              </li>
            )
          }
        </ul>
      </div>
      <div className="content">
        <Switch>
          <Route path="/dashboard/projects" component={Projects}></Route>
          <Route path="/dashboard/details" component={Details}></Route>
        </Switch>
      </div>
    </div>
  );
};

export default Dashboard;
