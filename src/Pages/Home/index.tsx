import React, { useEffect, useState } from "react";
import { getArticleList } from "../../Api/Interface";
import { createHashHistory } from "history"; // 如果是history路由

import CountUp from "react-countup";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  useEffect(() => {
    document.documentElement.scrollTop = HomeHeight.homeHeght;
  }, [HomeHeight.homeHeght]);

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
        <h3>{t("bannerTitle1")}</h3>
        <h5>
        {t("bannerTitle2")}
        </h5>
        <div
          className="Home_btn"
          onClick={() => {
            history.push("/dashboard/console");
          }}
        >
          {t("bannerBtn")}
        </div>
        <h6>{t("Cumulative")}</h6>

        <h2>
          <CountUp end={total} suffix="" {...countUpProps}></CountUp>
        </h2>
      </div>

      <div className="product animated fadeInRight">
        <h3 className="product_title">{t("Product")}</h3>
        <ul className="product_ul">
          <li>
            <img src={imgList[0]} alt="" />
            <h4>{t("Easy")}</h4>
            <p>{t("NoNeed")} </p>
            <p>{t("NoNeed1")}</p>
          </li>
          <li>
            <img src={imgList[1]} alt="" />
            <h4>{t("Stable")}</h4>
            <p>{t("ElaraHandles")}</p>
            <p>{t("ElaraHandles1")}</p>
          </li>
          <li>
            <img src={imgList[2]} alt="" />
            <h4>{t("Rich")}</h4>
            <p>{t("Ourhighly")}</p>
            <p>{t("Ourhighly1")}</p>
          </li>
          <li>
            <img src={imgList[3]} alt="" />
            <h4>{t("Customer")}</h4>
            <p>{t("WeProvide")}</p>
            <p>{t("WeProvide1")}</p>
          </li>
        </ul>
      </div>

      <div className="service">
        <h2>{t("service")}</h2>
        <h3>{t("Every")}</h3>
        <ul className="service_ul">
          <li>
            <img src={imgList[4]} alt="" />
            <p>{t("AllNetworks")}</p>
            <p>{t("AllNetworks1")}</p>
          </li>
          <li>
            <img src={imgList[5]} alt="" />
            <div>
            <p>{t("1000000requests")}</p>
            <p>{t("1000000requests1")}</p>
            </div>
          </li>
          <li>
            <img src={imgList[6]} alt="" />
            <p>{t("10projects")}</p>
          </li>
          <li>
            <img src={imgList[7]} alt="" />
            <p>{t("Direct")}</p>
          </li>
        </ul>
        <div
          className="service_btn"
          onClick={() => {
            history.push("/dashboard/console");
          }}
        >
          {t("bannerBtn")}
        </div>
      </div>

      <div className="HomeFooter">
        <h4>{t("NeedMore")}</h4>
        <p>{t("YouCan")}</p>
        <ul>
          <li>
            <img src={homeFonterImg[0]} alt="" />
            <a href="mailto:hi@patractlabs.com">Email</a>
          </li>
          <li>
            <img src={homeFonterImg[1]} alt="" />
            <a href="https://github.com/patractlabs/elara">Github</a>
          </li>
          <li>
            <img src={homeFonterImg[2]} alt="" />

            <a href="https://twitter.com/patractlabs">Twitter</a>
          </li>
          <li>
            <img src={homeFonterImg[3]} alt="" />

            <a href="https://medium.com/@patractlabs">Medium</a>
          </li>
          <li>
            <img src={homeFonterImg[4]} alt="" />
            <a href="https://app.element.io/#/room/#PatractLabsDev:matrix.org">
              Element
            </a>
          </li>
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
