import React, { useEffect, useRef, useState } from "react";
import { message, Spin } from "antd";
import echarts from "echarts";
import CountUp from "react-countup";

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

const countUpProps = {
  star: 0,
  duration: 2.75,
  decimals: 0,
  useEasing: true,
  useGrouping: true,
  separator: ",",
};

const Details: React.FC<childProps> = (props) => {
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
        const dataDateList: any[] = [];
        const datalist: any[] = [];
        const dataBandwidth: any[] = [];
        const TopData: any[] = [];
        let resData = res?.data;
        let count = 0;
        //给七天数据赋值
        for (const key in resData) {
          if (Object.prototype.hasOwnProperty.call(resData, key)) {
            const element = resData[key];
            dataDateList.push(key);
            datalist.push(element.request);
            dataBandwidth.push(element.bandwidth);

            if (Object.keys(element.method).length !== 0) {
              count++;
            }

            //处理top数据，累计加加
            for (const keys in element.method) {
              if (Object.prototype.hasOwnProperty.call(element.method, keys)) {
                const el = element.method[keys];

                if (keys !== "") {
                  if (count === 1) {
                    TopData.push({
                      value: Number(el),
                      name: keys,
                    });
                  } else {
                    TopData.forEach((els) => {
                      if (els.name.includes(keys)) {
                        els.value = els.value + Number(el);
                      } else {
                        TopData.push({
                          value: Number(els),
                          name: keys,
                        });
                      }
                    });
                  }
                }
              }
            }
          }
        }
        // 设置值七天相关
        setProjectWeekDate(dataDateList);
        setWeekRequestData(datalist);
        setWeekBandwidthData(dataBandwidth);
        setWeekTopData(TopData);
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
  }, []);

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
        text: "七日请求数统计",
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
          name: "直接访问",
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
        text: "七日消耗带宽统计",
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
          name: "直接访问",
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
        text: "top调用方法统计",
        left: "center",
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      // legend: {
      //   orient: "vertical",
      //   left: "left",
      //   data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
      // },
      series: [
        {
          name: "数据统计",
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
            <p>创建时间</p>
            <p>{time(projectdata.createtime)}</p>
          </li>
          <li>
            <p>状态</p>
            <p className="Details_listTColro">
              {statusActive(projectdata.status)}
            </p>
          </li>
          <li>
            <p>今日请求数</p>
            <p className="Details_listTColro">
              <CountUp
                end={Number(projectDaydata.request)}
                suffix=""
                {...countUpProps}
              ></CountUp>
            </p>
          </li>
          <li>
            <p>今日消耗带宽</p>
            <p className="Details_listTColro">
              <CountUp
                end={Number(projectDaydata.bandwidth)}
                suffix="B"
                {...countUpProps}
              ></CountUp>
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
              https://elara.patract.io/{projectdata.chain}/{id}
              <br />
              wss://elara.patract.io/{projectdata.chain}/{id}
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
