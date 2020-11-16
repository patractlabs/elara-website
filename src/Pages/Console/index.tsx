import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Spin, message } from "antd";
import useCounterModel from "../Hox/Sidebar";

import { projects, project } from "../../Api/Interface";
import { time, statusActive } from "../../utils/index";

import Popup from "../Popup";

import "./index.css";

interface childProps {
  // changeShow: Function;
  // mas: number;
  location: any;
  arr: any;
  // closeMask: () => any;
}

const imgList = [
  require("../assets/newbuild.svg"),
  require("../assets/data1.svg"),
  require("../assets/data2.svg"),
  require("../assets/data3.svg"),
  require("../assets/data4.svg"),
  require("../assets/data5.svg"),
  require("../assets/console_arrow.svg"),
  require("../assets/active.svg"),
];

const Console: React.FC<childProps> = () => {
  const counter = useCounterModel();
  const [offMask, setOffMask] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setData([]);
    projectsHttp();
  }, [counter.name]);

  const projectsHttp = () => {
    projects()
      .then((res) => {
        if (res?.code !== 0) {
          return;
        }
        const datalist: any[] = [];
        let resData = res?.data;
        resData.forEach((val: any, index: any) => {
          if (val.chain.includes(counter.name)) {
            datalist.push(val);
          }
        });
        setData(datalist);
        setLoading(false)
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  //关闭弹窗并且发送请求
  const closeMask = (code: any) => {
    if (code.hel == "ok" && code.val === "") {
      message.error("请输入正确项目名称");
      return
    } else if (code.off && code.val !== "") {
      const projectNewData = {
        chain: counter.name,
        name: code.val,
      };
      projectNew(projectNewData);
    }
    setOffMask(false);
    setLoading(true)
  };

  const projectNew = (val: any) => {
    project(val)
      .then((res) => {
        if (res?.code !== 0) {
          message.error(res?.msg);
          setLoading(false)
          return;
        }
        message.success("创建成功");
        projectsHttp();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div>
      <Popup
        onCancel={() => {
          console.log(1111);
        }}
        changeOff={(code: any) => {
          closeMask(code);
        }}
        // onClick={{(code: number) => {console.log(code)}}
        // closeMask={closeMask}
        msg={offMask}
      />

      <div className="console_header">
        {/* <Spin tip="Loading..." /> */}
        <h3 className="console_h3">{counter.name} Projects</h3>
        <div
          className="console_newBuildBtn"
          onClick={() => {
            setOffMask(true);
          }}
          style={{
            float: "right",
            display: data.length ? "block" : "none",
          }}
        >
          <img src={imgList[0]} alt="" />
          新建项目
        </div>
      </div>
      {data.length < 1 ? (
        <div className="console_newBuild">
          <div
            className="console_newBuildBtn"
            onClick={() => {
              setOffMask(true);
            }}
          >
            <img src={imgList[0]} alt="" />
            新建项目
          </div>
          <p>快来创建你的第一个 {counter.name} 项目吧。</p>
        </div>
      ) : (
        <Spin spinning={loading}>
          <ul className="dataList">
            {data.map((el: any,key:number) => {
              return (
                <Link
                      to={{
                        pathname: `/dashboard/details`,
                        state: { id: el.id },
                      }}
                      key={key}
                    >
                <li className="dataList_li" >
                  <div className="dataList_liDiv">
                    <p>
                      <img src={imgList[1]} alt="" />
                      <span>项目名称</span>
                    </p>
                    <p>{el.name}</p>
                  </div>
                  <div className="dataList_liDiv">
                    <p>
                      <img src={imgList[2]} alt="" />
                      <span>创建时间</span>
                    </p>
                    <p>{time(el.createtime)}</p>
                  </div>
                  <div className="dataList_liDiv">
                    <p>
                      <img
                        src={el.status === "Active" ? imgList[7] : imgList[3]}
                        alt=""
                      />
                      <span>状态</span>
                    </p>
                    <p className={el.status === "Active" ? "actsGren" : ""}>
                      {statusActive(el.status)}
                    </p>
                  </div>
                  {/* <div className="dataList_liDiv">
                  <p>
                    <img src={imgList[5]} alt="" />
                    <span>今日请求数</span>
                  </p>
                  <p>888</p>
                </div> */}
                  <div className="dataList_liDiv">
                
                      <img src={imgList[6]} className="dataListArrow" alt="" />
                    
                  </div>
                </li>
                </Link>
              );
            })}
          </ul>
        </Spin>
      )}
    </div>
  );
};

export default Console;
