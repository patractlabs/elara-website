import React, { useEffect, useState } from "react";
import { getArticleList } from "../../Api/Interface";
import { createHashHistory } from "history"; // 如果是history路由

import CountUp from "react-countup";

import homeHeight from "../Hox/Home";
import Footer from "../Footer/index";

import "./index.css";

const imgList = [
  require("../assets/cp1.svg"),
  require("../assets/cp2.svg"),
  require("../assets/cp3.svg"),
  require("../assets/cp4.svg"),
  require("../assets/sv1.svg"),
  require("../assets/sv2.svg"),
  require("../assets/sv3.svg"),
  require("../assets/sv4.svg"),
];

const homeFonterImg = [
  require("../assets/Email.svg"),
  require("../assets/Github.svg"),
  require("../assets/Twitter.svg"),
  require("../assets/Medium.svg"),
  require("../assets/Element.svg"),
];

interface props {
  data: { [key: string]: any };
}

const countUpProps = {
  star: 0,
  duration: 2.75,
  decimals: 0,
  useEasing: true,
  useGrouping: true,
  separator: ",",
};

const Home: React.FC<props> = ({ data }) => {
  const [total, settotal] = useState(0);
  const history = createHashHistory();
  const HomeHeight = homeHeight();

  useEffect(()=>{
      document.documentElement.scrollTop = HomeHeight.homeHeght
  },[HomeHeight.homeHeght])
  

  useEffect(() => {
    getArticleList()
      .then((res) => {
        if (res?.code !== 0) {
          console.log("失败");
          return;
        }
        let data = res?.data;
        let total = 0;
        for (const key in data) {
          total = Number(data[key]);
        }
        settotal(total);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  return (
    <div className="Home" id="Home">
      <div className="Home_bannre animated fadeInLeft">
        <h3>随时接入 Polkadot 生态开发应用</h3>
        <h5>
          Elara 提供一站式区块链API组件，即时接入 Polkadot\ Kusama\ Jupiter...
        </h5>
        <div
          className="Home_btn"
          onClick={() => {
            history.push("/dashboard/console");
          }}
        >
          开始免费使用
        </div>
        <h6>累计请求数</h6>

        <h2>
          <CountUp end={total} suffix="" {...countUpProps}></CountUp>
        </h2>
      </div>

      <div className="product animated fadeInRight">
        <h3 className="product_title">产品优势</h3>
        <ul className="product_ul">
          <li>
            <img src={imgList[0]} alt="" />
            <h4>简单易用</h4>
            <p>无需等待同步，无需复杂设置．只需引入 Elara，即可使用基于 </p>
            <p>HTTPS 和 WebSocket 的 JSON-RPC 接口接入 Polkadot网络</p>
          </li>
          <li>
            <img src={imgList[1]} alt="" />
            <h4>稳定高可用</h4>
            <p>Elara 处理所有网络变更和升级，专注于提供高可用稳定的服务，简</p>
            <p>化应用基础架构，让开发者专注于构建上层应用</p>
          </li>
          <li>
            <img src={imgList[2]} alt="" />
            <h4>丰富的多链支持</h4>
            <p>我们高度可扩展的基础架构确保对 Polkadot 平行链可以快速接入，</p>
            <p>让开发者的应用快速布局新网络</p>
          </li>
          <li>
            <img src={imgList[3]} alt="" />
            <h4>客户服务</h4>
            <p>我们随时为开发者提供支持．如果应用请求量超过了账户免费额度，</p>
            <p>可以联系我们提供定制化方案</p>
          </li>
        </ul>
      </div>

      <div className="service">
        <h2>服务</h2>
        <h3>每位生态开发者都可以免费使用</h3>
        <ul className="service_ul">
          <li>
            <img src={imgList[4]} alt="" />
            <p>Polkadot 生态的</p>
            <p>所有网络</p>
          </li>
          <li>
            <img src={imgList[5]} alt="" />
            <p>
              1,000,000 个 <br />
              请求/项目/天
            </p>
          </li>
          <li>
            <img src={imgList[6]} alt="" />
            <p>10 个项目</p>
          </li>
          <li>
            <img src={imgList[7]} alt="" />
            <p>直接客户支持</p>
          </li>
        </ul>
        <div
          className="service_btn"
          onClick={() => {
            history.push("/dashboard/console");
          }}
        >
          开始免费使用
        </div>
      </div>

      <div className="HomeFooter" id="HomeFooter">
        <h4>需要更多的服务？</h4>
        <p>您可以通过以下渠道联系我们，我们将为您提供定制方案</p>
        <ul>
          <li>
            <img src={homeFonterImg[0]} alt="" />
            <span>Email</span>
          </li>
          <li>
            <img src={homeFonterImg[1]} alt="" />
            <span>Github</span>
          </li>
          <li>
            <img src={homeFonterImg[2]} alt="" />
            <span>Twitter</span>
          </li>
          <li>
            <img src={homeFonterImg[3]} alt="" />
            <span>Medium</span>
          </li>
          <li>
            <img src={homeFonterImg[4]} alt="" />
            <span>Element</span>
          </li>
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
