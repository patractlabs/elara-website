import React, { useState, useEffect } from "react";
import { Link, Prompt } from "react-router-dom";
import { Spin, message, Empty } from "antd";
import { useTranslation } from "react-i18next";

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
    message: any
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

const eqChain=(c1:any,c2:any)=>{
    return c1.toLowerCase() == c2.toLowerCase() ?true:false;
}
const Console: React.FC<childProps> = () => {
    const counter = useCounterModel();
    const { t, i18n } = useTranslation();
    const [offMask, setOffMask] = useState<boolean>(false);
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setData([]);
        projectsHttp();
        setLoading(true);
    }, [counter.name]);

    const projectsHttp = () => {
        projects()
            .then((res) => {
                if (res?.code !== 0) {
                    return;
                }
                const datalist: any[] = [];
                let Polkadot: number = 0;
                let Kusama: number = 0;
                let Jupiter: number = 0;
                let Rococo: number = 0;
                let Darwinia:number=0;
                let Dock:number=0;
                let Edgeware:number=0;
                let Kulupu:number=0;
                let Nodle:number=0;
                let Plasm:number=0;
                let Stafi:number=0;
                let Mandala:number=0;
                let ChainX:number=0;

                let resData = res?.data;
                resData.forEach((val: any, index: any) => {
                    if (eqChain(val.chain,counter.name)) {
                        datalist.push(val);
                    }
                });

                resData.forEach((val: any, index: any) => {
                    if (eqChain(val.chain,"Polkadot")) {
                        Polkadot++;
                    } else if (eqChain(val.chain,"Kusama")) {
                        Kusama++;
                    } else if (eqChain(val.chain,"Jupiter")) {
                        Jupiter++;
                    }else if (eqChain(val.chain,"Rococo")) {
                        Rococo++;
                    }
                    else if (eqChain(val.chain,"Darwinia")) {
                        Darwinia++;
                    }
                    else if (eqChain(val.chain,"Dock")) {
                        Dock++;
                    }
                    else if (eqChain(val.chain,"Edgeware")) {
                        Edgeware++;
                    }
                    else if (eqChain(val.chain,"Kulupu")) {
                        Kulupu++;
                    }
                    else if (eqChain(val.chain,"Nodle")) {
                        Nodle++;
                    }
                    else if (eqChain(val.chain,"Plasm")) {
                        Plasm++;
                    }
                    else if (eqChain(val.chain,"Stafi")) {
                        Stafi++;
                    }
                    else if (eqChain(val.chain,"Mandala")) {
                        Mandala++;
                    }
                    else if (eqChain(val.chain,"ChainX")) {
                        ChainX++;
                    }
                });
                counter.setNameLength({
                    Polkadot: Polkadot,
                    Kusama: Kusama,
                    Jupiter: Jupiter,
                    Rococo:Rococo,
                    Darwinia:Darwinia,
                    Dock:Dock,
                    Edgeware:Edgeware,
                    Kulupu:Kulupu,
                    Nodle:Nodle,
                    Plasm:Plasm,
                    Stafi:Stafi,
                    Mandala:Mandala,
                    ChainX:ChainX
                });
                setData(datalist);
                setLoading(false);
            })
            .catch((err) => {
                console.log("err", err);
            });
    };

    //关闭弹窗并且发送请求
    const closeMask = (code: any) => {
        if (code.hel == "ok" && code.val === "") {
            message.error(
                i18n.language === "en"
                    ? "Please enter the correct project name"
                    : "请输入正确项目名称"
            );
            return;
        } else if (code.off && code.val !== "") {
            const projectNewData = {
                chain: counter.name,
                name: code.val,
            };
            setLoading(true);
            projectNew(projectNewData);
        }
        setOffMask(false);
    };

    const projectNew = (val: any) => {
        project(val)
            .then((res) => {
                if (res?.code !== 0) {
                    message.error(res?.msg);
                    setLoading(false);
                    return;
                }
                message.success(
                    i18n.language == "en" ? "Created successfully" : "创建成功"
                );
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

            <Prompt
                when={true}
                message={() => {
                    return true
                }}
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
                    {t("listPage.CEEATENEW")}
                </div>
            </div>
            {data.length < 1 ? (
                <Spin spinning={loading}>
                    {/*counter.name === "Polkadot" ?*/ (
                        <div className="console_newBuild">
                            <div
                                className="console_newBuildBtn"
                                onClick={() => {
                                    setOffMask(true);
                                }}
                            >
                                <img src={imgList[0]} alt="" />
                                {t("listPage.CEEATENEW")}
                            </div>
                            <p>
                                {t("listPage.onProject")} {counter.name} {t("listPage.Project")}
                            </p>
                        </div>
                    )/* : (
                            <div className="console_newBuild">
                                <Empty description={false} />
                                <p>coming soon</p>
                            </div>
                    )*/}
                </Spin>
            ) : (
                    <Spin spinning={loading}>
                        <ul className="dataList">
                            {data.map((el: any, key: number) => {
                                return (
                                    <Link
                                        to={{
                                            pathname: `/dashboard/details`,
                                            state: { id: el.id },
                                        }}
                                        key={key}
                                        onClick={() => {
                                            window.sessionStorage.setItem("id", el.id);
                                        }}
                                    >
                                        <li className="dataList_li">
                                            <div className="dataList_liDiv">
                                                <p>
                                                    <img src={imgList[1]} alt="" />
                                                    <span>{t("listPage.Name")}</span>
                                                </p>
                                                <p>{el.name}</p>
                                            </div>
                                            <div className="dataList_liDiv">
                                                <p>
                                                    <img src={imgList[2]} alt="" />
                                                    <span>{t("listPage.CreationTime")}</span>
                                                </p>
                                                <p>{time(el.createtime)}</p>
                                            </div>
                                            <div className="dataList_liDiv">
                                                <p>
                                                    <img
                                                        src={el.status === "Active" ? imgList[7] : imgList[3]}
                                                        alt=""
                                                    />
                                                    <span>{t("listPage.Status")}</span>
                                                </p>
                                                <p className={el.status === "Active" ? "actsGren" : ""}>
                                                    {statusActive(el.status, i18n.language)}
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
