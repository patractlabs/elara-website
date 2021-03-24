import React, { useState, createContext } from "react";
import { Col, Layout, Row } from "antd";
import useCounterModel from "../Hox/Sidebar";
import { Switch, Route, Link } from "react-router-dom";

import PageH from "../../utils/pageHeight";

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

import "./index.css";

const { Sider, Content } = Layout;

// interface PaginProps {
//   changeShow: (code: number) => void;
//   mas: number;
// }

const imgList = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
];

export const CountContext = createContext(1);

const nodes = [
  {
    name: 'Polkadot',
    img: img1
  },
  {
    name: 'Kusama',
    img: img2
  },
  {
    name: 'Jupiter',
    img: img3
  },
  {
    name: 'Rococo',
    img: img4
  },
  {
    name: 'Darwinia',
    img: img5
  },
  {
    name: 'Dock',
    img: img6
  },
  {
    name: 'Edgeware',
    img: img7
  },
  {
    name: 'Kulupu',
    img: img8
  },
  {
    name: 'Nodle',
    img: img9
  },
  {
    name: 'Plasm',
    img: img10
  },
  {
    name: 'Stafi',
    img: img11
  },
  {
    name: 'Mandala',
    img: img12
  },
];

const Dashboard: React.FC = () => {
  const [introduceNum, setIntroduceNum] = useState(1);
  const counter = useCounterModel();


  const getID = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setIntroduceNum(Number(e.target.dataset.id));
    counter.decrement(Number(e.target.dataset.id));
  };

  return (
    // animated fadeInLeft
    <div className="dashboard">
      <div className="sider">
        <ul className="project-list">
          {
            nodes.map(node => 
              <li className="project-item">
                <img src={ node.img } alt="" />
                <span>{ node.name }</span>
                <div className="project-counts">3</div>
              </li>
            )
          }
        </ul>
      </div>
      <div className="content">
        <Route path="/dashboard/console" component={Projects}></Route>

      </div>
      
    </div>
          /* <Switch>
            <Route path="/dashboard/console" component={Console}></Route>
            <Route path="/dashboard/details" component={Details}></Route>
          </Switch> */
  );
};

export default Dashboard;
