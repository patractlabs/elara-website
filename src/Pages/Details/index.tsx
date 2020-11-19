import React, { useEffect, useRef, useState } from "react";
import { message, Spin } from "antd";
import echarts from "echarts";
import { useTranslation} from "react-i18next";

import { bytesToSize ,combineObjectInList} from "../../utils/index";
import { WSS_ENDPOINTS_URL, ENDPOINTS_URL } from "../../Config/origin";

import {
  weekDetails,
  projectDetails,
  projectDayDetails,
} from "../../Api/Interface";
import { time, statusActive } from "../../utils/index";

import "./index.css";

interface childProps {
  location: any;
}

const Details: React.FC<childProps> = (props) => {
  const { t,i18n } = useTranslation();
  const [projectdata, setProjectdata] = useState<any>({});
  const [projectDaydata, setProjectDaydata] = useState<any>({
    request: 0,
    bandwidth: 0,
  });

  const [loading, setLoading] = useState<boolean>(true);

  // k线相关
  const [projectWeekDate, setProjectWeekDate] = useState<any>({}); //时间
  const [weekRequestData, setWeekRequestData] = useState<any>({}); //七天请求
  const [weekBandwidthData, setWeekBandwidthData] = useState<any>({}); //七天消耗带宽
  const [weekTopData, setWeekTopData] = useState<any>({}); //七天Top数据

  const { location } = props;
  const id = location.state?.id || window.sessionStorage.getItem("id");

  const getWeekDetails = () => {
    weekDetails(id)
      .then((res) => {
        if (res?.code !== 0) {
          message.error(res?.msg);
          return;
        }
        setLoading(false);
        const dataDateList: any[] = [];
        const datalist: any[] = [];
        const dataBandwidth: any[] = [];
        let TopData: any[] = [];
        const TopDataTEST: any[] = [];
        let resData = res?.data;
        let count = 0;
        // 给七天数据赋值
        for (const key in resData) {
          if (Object.prototype.hasOwnProperty.call(resData, key)) {
            const element = resData[key];
            dataDateList.push(key.substr(4, 2) + "-" + key.substr(6, 8));
            datalist.push(element.request);
            dataBandwidth.push(element.bandwidth);

            if (Object.keys(element.method).length !== 0) {
              count++;
            }

            //处理top数据，累计加加
            for (const keys in element.method) {
              const el = element.method[keys];
              TopDataTEST.push({
                value: Number(el),
                name: keys,
              });
            }
          }
        }
        TopData =  combineObjectInList(TopDataTEST,'name',['value'])
        // // 设置值七天相关
        setProjectWeekDate(dataDateList);
        setWeekRequestData(datalist);
        setWeekBandwidthData(dataBandwidth);
        setWeekTopData(TopData.slice(0,21));
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const getProjectDetails = () => {
    projectDetails(id)
      .then((res) => {
        if (res?.code !== 0) {
          message.error(res?.msg);
          return;
        }
        setProjectdata(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const getProjectDayDetails = () => {
    projectDayDetails(id)
      .then((res) => {
        if (res?.code !== 0) {
          message.error(res?.msg);
          return;
        }
        setProjectDaydata(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    getWeekDetails();
    getProjectDetails();
    getProjectDayDetails();
  }, [i18n.language]);

  useEffect(() => {
    init();
  }, [projectWeekDate, weekRequestData, weekBandwidthData, weekTopData]);

  const weekEchart = useRef(null);
  let chartInstance = null;

  const echartMainLeft = useRef(null);
  let chartInstanceLeft = null;

  const echartMainRight = useRef(null);
  let chartInstanceRight = null;

  let renderChart = () => {
    const myChart = echarts.getInstanceByDom(
      (weekEchart.current as unknown) as HTMLDivElement
    );
    if (myChart) chartInstance = myChart;
    else
      chartInstance = echarts.init(
        (weekEchart.current as unknown) as HTMLDivElement
      );
    chartInstance.setOption({
      title: {
        text: i18n.language==='en'?'Weekly Requests Statistics':'周请求数统计',
      },
      color: ["#ACC5BD "],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: projectWeekDate,
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: i18n.language==='en'?'Direct Access':'直接访问',
          type: "bar",
          barWidth: "60%",
          label: {
            show: true,
            position: "top",
          },
          data: weekRequestData,
        },
      ],
    });
  };

  let renderChartLeft = () => {
    const myChart = echarts.getInstanceByDom(
      (echartMainLeft.current as unknown) as HTMLDivElement
    );
    if (myChart) chartInstanceLeft = myChart;
    else
      chartInstanceLeft = echarts.init(
        (echartMainLeft.current as unknown) as HTMLDivElement
      );
    chartInstanceLeft.setOption({
      title: {
        text: i18n.language==='en'?'Weekly Requests Statistics (B)':'周带宽统计 (B)',
      },
      color: ["#ACC5BD "],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: projectWeekDate,
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: i18n.language==='en'?'Bandwidth Consumption':'消耗带宽',
          type: "bar",
          barWidth: "60%",
          label: {
            show: true,
            position: "top",
          },
          data: weekBandwidthData,
        },
      ],
    });
  };

  let renderChartRight = () => {
    const myChart = echarts.getInstanceByDom(
      (echartMainRight.current as unknown) as HTMLDivElement
    );
    if (myChart) chartInstanceRight = myChart;
    else
      chartInstanceRight = echarts.init(
        (echartMainRight.current as unknown) as HTMLDivElement
      );
    chartInstanceRight.setOption({
      title: {
        text: i18n.language==='en'?'Top Call Method Statistics':'Top调用方法统计',
        left: "center",
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      series: [
        {
          name: i18n.language==='en'?'Data Statistics':'数据统计',
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data:
            weekTopData.length < 1
              ? [
                {
                  name: "null",
                  value: 0,
                  itemStyle: {
                    color: "#39CA9F",
                  },
                },
              ]
              : weekTopData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    });
  };

  const init = () => {
    renderChart();
    renderChartLeft();
    renderChartRight();
  };

  return (
    <div className="Details">
      <Spin spinning={loading}>
        <ul className="Details_listT" id="Details_listT">
          <li>
            <p>{t('Details.CreationTime')}</p>
            <p>{time(projectdata.createtime)}</p>
          </li>
          <li>
            <p>{t('Details.Status')}</p>
            <p className="Details_listTColro">
              {statusActive(projectdata.status,i18n.language)}
            </p>
          </li>
          <li>
            <p>{t('Details.Today')}</p>
            <p className="Details_listTColro">
              {Number(projectDaydata.request)}
            </p>
          </li>
          <li>
            <p>{t('Details.TodayBandwidth')}</p>
            <p className="Details_listTColro">
              {bytesToSize(Number(projectDaydata.bandwidth))}
            </p>
          </li>
        </ul>
        <ul className="Details_listT">
          <li>
            <p>API</p>
            <p className="Details_listTColro">PID</p>
            <p>{projectdata.id}</p>
          </li>
          <li>
            <p className="Sehide">API</p>
            <p className="Details_listTColro">PSECRET</p>
            <p>{projectdata.secret}</p>
          </li>
          <li>
            <p className="Sehide">API</p>
            <p className="Details_listTColro">ENDPOINTS</p>
            <p className="dMTop">
              {ENDPOINTS_URL}/{projectdata.chain}/{id}
              <br />
              {WSS_ENDPOINTS_URL}/{projectdata.chain}/{id}
            </p>
          </li>
        </ul>
      </Spin>
      <div>
        <Spin spinning={loading}>
          <div id="weekEchart">
            <div className="weekEchart" ref={weekEchart} />
          </div>
        </Spin>
        <Spin spinning={loading}>
          <div className="echartMain">
            <div className="echartMainLeft" ref={echartMainLeft}></div>
            <div className="echartMainRight" ref={echartMainRight}></div>
          </div>
        </Spin>
      </div>
    </div>
  );
};

export default Details;
