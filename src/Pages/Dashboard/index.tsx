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
              className={introduceNum === 1 ? "siderUlActive" : ""}
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
            </li>
            <li
              data-id="2"
              onClick={getID}
              className={introduceNum === 2 ? "siderUlActive" : ""}
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
            </li>
            <li
              data-id="3"
              onClick={getID}
              className={introduceNum === 3 ? "siderUlActive" : ""}
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
            </li>
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
