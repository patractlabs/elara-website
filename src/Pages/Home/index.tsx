import React, { useEffect, useState } from "react";
import { apiGetChainStats } from "../../core/data/api";
import { createHashHistory } from "history"; // 如果是history路由

import CountUp from "react-countup";
import { useTranslation } from "react-i18next";

import Footer from "../Footer/index";
import img1 from '../../assets/cp1.svg';
import img2 from '../../assets/cp2.svg';
import img3 from '../../assets/cp3.svg';
import img4 from '../../assets/cp4.svg';
import img5 from '../../assets/all-network.svg';
import img6 from '../../assets/request.svg';
import img7 from '../../assets/projects.svg';
import img8 from '../../assets/sv4.svg';
import img9 from '../../assets/Email.svg';
import img10 from '../../assets/Github.svg';
import img11 from '../../assets/Twitter.svg';
import img12 from '../../assets/Medium.svg';
import img13 from '../../assets/Element.svg';
import img14 from '../../assets/free-service.svg';
import img15 from '../../assets/free-service-zh.svg';
import img16 from '../../assets/service-advantage.svg';
import img17 from '../../assets/service-advantage-zh.svg';
import "./index.css";
import { Language } from '../../core/enum';

const imgList = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
];

const homeFonterImg = [
  img9,
  img10,
  img11,
  img12,
  img13,
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
  // const HomeHeight = homeHeight();
  const { t, i18n } = useTranslation();

  // useEffect(() => {
  //   document.documentElement.scrollTop = HomeHeight.homeHeght;
  // }, [HomeHeight.homeHeght]);

  useEffect(() => {
    apiGetChainStats()
      .then(chainStatus => {
        let total = 0;
        for (const key in chainStatus) {
          total += Number(chainStatus[key]);
        }
        settotal(total);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  return (
    <div className="Home" id="Home">
      <div className="Home_banner animated fadeInLeft">
        {
          i18n.language === Language.zh ?
            <h3 className="banner_title1">波卡生态的<span >公共API接入服务</span></h3>
            :
            <h3 className="banner_title1"><span>Public API Access Service for</span><br/>Polkadot Ecosystem</h3>
        }
        <h5 className="banner_title2"> {t("bannerTitle2")} </h5>
        <div
          className="service_btn"
          onClick={() => {
            history.push("/dashboard/projects");
          }}
        >
          {t("bannerBtn")}
        </div>
        <div className="countup-wrap">
          <div className="countup">
            <div className="countup-title">{t("Cumulative")}</div>
            <div className="countup-counts">
              <CountUp end={total} suffix="" {...countUpProps}></CountUp>
            </div>
          </div>
        </div>
      </div>

      <div className="product animated fadeInRight">
        <div className="title_holder">
          {
            i18n.language === Language.en ?
              <img src={img16} alt="" />
              :
              <img src={img17} alt="" />
          }
          {/* <div className="area_title">{t("Product")}</div> */}
        </div>
        <div className="product_ul_holder">
          <ul className="product_ul">
            <li>
              <img src={imgList[0]} alt="" />
              <h4>{t("Easy")}</h4>
              <p>{t("NoNeed")} </p>
            </li>
            <li>
              <img src={imgList[1]} alt="" />
              <h4>{t("Stable")}</h4>
              <p>{t("ElaraHandles")}</p>
            </li>
            <li>
              <img src={imgList[2]} alt="" />
              <h4>{t("Rich")}</h4>
              <p>{t("Ourhighly")}</p>
            </li>
            <li>
              <img src={imgList[3]} alt="" />
              <h4>{t("Customer")}</h4>
              <p>{t("WeProvide")}</p>
            </li>
          </ul>
        </div>
      </div>

      <div className="service">
        <div className="title_holder">
          {
            i18n.language === Language.en ?
              <img src={img14} alt="" />
              :
              <img src={img15} alt="" />
          }
          {/* <div className="area_title">{t("service")}</div> */}
        </div>
        <div className="service_ul_holder">
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
          </ul>
        </div>
        <div
          className="service_btn service_btn_service"
          onClick={() => {
            history.push("/dashboard/projects");
          }}
        >
          {t("bannerBtn")}
        </div>
      </div>

      <div className="HomeFooter">
        <ul>
          <li>
            <img src={homeFonterImg[0]} alt="" />
            <a href="mailto:hi@patractlabs.com">Email</a>
          </li>
          <li>
            <img src={homeFonterImg[1]} alt="" />
            <a target="_blank" rel="noreferrer" href="https://github.com/patractlabs/elara">Github</a>
          </li>
          <li>
            <img src={homeFonterImg[2]} alt="" />

            <a target="_blank" rel="noreferrer" href="https://twitter.com/patractlabs">Twitter</a>
          </li>
          <li>
            <img src={homeFonterImg[3]} alt="" />

            <a target="_blank" rel="noreferrer" href="https://medium.com/@patractlabs">Medium</a>
          </li>
          <li>
            <img src={homeFonterImg[4]} alt="" />
            <a target="_blank" rel="noreferrer" href="https://app.element.io/#/room/!sezLvdnMOcNSSAKcZg:matrix.org">
              Element
            </a>
          </li>
        </ul>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
