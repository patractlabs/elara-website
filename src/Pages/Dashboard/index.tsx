import React, { useState, createContext } from "react";
import { Layout } from "antd";
import useCounterModel from "../Hox/Sidebar";
import { Switch, Route, Link } from "react-router-dom";

import PageH from "../../utils/pageHeight";

import Console from "../Console";
import Details from "../Details";

import "./index.css";

const { Sider, Content } = Layout;

// interface PaginProps {
//   changeShow: (code: number) => void;
//   mas: number;
// }

const imgList = [
  require("../assets/Polkadot.svg"),
  require("../assets/Kusama.svg"),
  require("../assets/Jupiter.svg"),
  require("../assets/Rococo.svg"),
  require("../assets/Darwinia.png"),
  require("../assets/Dock.svg"),
  require("../assets/Edgeware.svg"),
  require("../assets/Kulupu.svg"),
  require("../assets/Nodle.svg"),
  require("../assets/Plasm.png"),   
  require("../assets/Stafi.png"),  
  require("../assets/Mandala.svg"), 
];

export const CountContext = createContext(1);

const Dashboard: React.FC = (props) => {
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
      <Layout style={{ height: PageH(70) }}>
        <Sider style={{ background: "#39CA9F" }}>
          <ul className="siderUl">
            <li
              data-id="1"
              onClick={getID}
              className={counter.name === "Polkadot" ? "siderUlActive" : ""}
            >
              <Link
                to={{
                  pathname: `/dashboard/console`,
                  state: { name: 1 },
                }}
                data-id="1"
              >
                <img data-id="1" src={imgList[0]} alt="" />
                <p data-id="1">Polkadot</p>
              </Link>
              <div className="nameLength">
                {counter.nameList.Polkadot}
              </div>
            </li>
            <li
              data-id="2"
              onClick={getID}
              className={counter.name === "Kusama" ? "siderUlActive" : ""}
            >
              <Link
                to={{
                  pathname: `/dashboard/console`,
                  state: { name: 2 },
                }}
                data-id="2"
              >
                <img data-id="2" src={imgList[1]} alt="" />
                <p data-id="2">Kusama</p>
              </Link>
              <div className="nameLength">
                {counter.nameList.Kusama}
              </div>
            </li>
            { <li
              data-id="3"
              onClick={getID}
              className={counter.name === "Jupiter" ? "siderUlActive" : ""}
            >
              <Link
                to={{
                  pathname: `/dashboard/console`,
                  state: { name: 2 },
                }}
                data-id="3"
              >
                <img data-id="3" src={imgList[2]} alt="" />
                <p data-id="3">Jupiter</p>
              </Link>
              <div className="nameLength">
                {counter.nameList.Jupiter}
              </div>
            </li> }
            { <li
              data-id="4"
              onClick={getID}
              className={counter.name === "Rococo" ? "siderUlActive" : ""}
            >
              <Link
                to={{
                  pathname: `/dashboard/console`,
                  state: { name: 2 },
                }}
                data-id="4"
              >
                <img data-id="4" src={imgList[3]} alt="" />
                <p data-id="4">Rococo</p>
              </Link>
              <div className="nameLength">
                {counter.nameList.Rococo}
              </div>
            </li> }
            { <li
              data-id="5"
              onClick={getID}
              className={counter.name === "Darwinia" ? "siderUlActive" : ""}
            >
              <Link
                to={{
                  pathname: `/dashboard/console`,
                  state: { name: 2 },
                }}
                data-id="5"
              >
                <img data-id="5" src={imgList[4]} alt="" />
                <p data-id="5">Darwinia</p>
              </Link>
              <div className="nameLength">
                {counter.nameList.Darwinia}
              </div>
            </li> }
            { <li
              data-id="6"
              onClick={getID}
              className={counter.name === "Dock" ? "siderUlActive" : ""}
            >
              <Link
                to={{
                  pathname: `/dashboard/console`,
                  state: { name: 2 },
                }}
                data-id="6"
              >
                <img data-id="6" src={imgList[5]} alt="" />
                <p data-id="6">Dock</p>
              </Link>
              <div className="nameLength">
                {counter.nameList.Dock}
              </div>
            </li> }
            { <li
              data-id="7"
              onClick={getID}
              className={counter.name === "Edgeware" ? "siderUlActive" : ""}
            >
              <Link
                to={{
                  pathname: `/dashboard/console`,
                  state: { name: 2 },
                }}
                data-id="7"
              >
                <img data-id="7" src={imgList[6]} alt="" />
                <p data-id="7">Edgeware</p>
              </Link>
              <div className="nameLength">
                {counter.nameList.Edgeware}
              </div>
            </li> }
            { <li
              data-id="8"
              onClick={getID}
              className={counter.name === "Kulupu" ? "siderUlActive" : ""}
            >
              <Link
                to={{
                  pathname: `/dashboard/console`,
                  state: { name: 2 },
                }}
                data-id="8"
              >
                <img data-id="8" src={imgList[7]} alt="" />
                <p data-id="8">Kulupu</p>
              </Link>
              <div className="nameLength">
                {counter.nameList.Kulupu}
              </div>
            </li> }
            { <li
              data-id="9"
              onClick={getID}
              className={counter.name === "Nodle" ? "siderUlActive" : ""}
            >
              <Link
                to={{
                  pathname: `/dashboard/console`,
                  state: { name: 2 },
                }}
                data-id="9"
              >
                <img data-id="9" src={imgList[8]} alt="" />
                <p data-id="9">Nodle</p>
              </Link>
              <div className="nameLength">
                {counter.nameList.Nodle}
              </div>
            </li> }
            { <li
              data-id="10"
              onClick={getID}
              className={counter.name === "Plasm" ? "siderUlActive" : ""}
            >
              <Link
                to={{
                  pathname: `/dashboard/console`,
                  state: { name: 2 },
                }}
                data-id="10"
              >
                <img data-id="10" src={imgList[9]} alt="" />
                <p data-id="10">Plasm</p>
              </Link>
              <div className="nameLength">
                {counter.nameList.Plasm}
              </div>
            </li> }
            { <li
              data-id="11"
              onClick={getID}
              className={counter.name === "Stafi" ? "siderUlActive" : ""}
            >
              <Link
                to={{
                  pathname: `/dashboard/console`,
                  state: { name: 2 },
                }}
                data-id="11"
              >
                <img data-id="11" src={imgList[10]} alt="" />
                <p data-id="11">Stafi</p>
              </Link>
              <div className="nameLength">
                {counter.nameList.Stafi}
              </div>
            </li> }
            { <li
              data-id="12"
              onClick={getID}
              className={counter.name === "Mandala" ? "siderUlActive" : ""}
            >
              <Link
                to={{
                  pathname: `/dashboard/console`,
                  state: { name: 2 },
                }}
                data-id="12"
              >
                <img data-id="12" src={imgList[11]} alt="" />
                <p data-id="12">Mandala</p>
              </Link>
              <div className="nameLength">
                {counter.nameList.Mandala}
              </div>
            </li> }
          </ul>
        </Sider>
        <Layout className="site-layout">
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: "0 24px",
              minHeight: "280px",
            }}
          >
            {/* <CountContext.Provider value={introduceNum}>
              <Console
                changeShow={(code: number) => setIntroduceNum(code)}
                mas={introduceNum}
              ></Console>
            </CountContext.Provider> */}

            <Switch>
              <Route path="/dashboard/console" component={Console}></Route>
              <Route path="/dashboard/details" component={Details}></Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Dashboard;
