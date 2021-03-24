import React, { useState, useEffect } from "react";
import { Link, Prompt } from "react-router-dom";
import { Spin, message, } from "antd";
import { useTranslation } from "react-i18next";

import useCounterModel from "../Hox/Sidebar";
import { apiGetProjectList, apiCreateProject } from "../../core/data/api";
import { time, statusActive } from "../../utils/index";

import Popup from "../Popup";
import Img1 from '../../assets/newbuild.svg';
import Img2 from '../../assets/data1.svg';
import Img3 from '../../assets/data2.svg';
import Img4 from '../../assets/data3.svg';
import Img5 from '../../assets/data4.svg';
import Img6 from '../../assets/data5.svg';
import Img7 from '../../assets/console_arrow.svg';
import Img8 from '../../assets/active.svg';
import "./index.css";
import { APIError, APIErrorType } from '../../core/types/classes/error';

interface childProps {
    location: any;
    arr: any;
    message: any
}

const imgList = [
  Img1,
  Img2,
  Img3,
  Img4,
  Img5,
  Img6,
  Img7,
  Img8,
];

const eqChain=(c1: string, c2: string) => {
  return c1.toLowerCase() === c2.toLowerCase();
}
const Projects: React.FC<childProps> = () => {
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
        apiGetProjectList()
            .then(projects => {
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

                projects.forEach(project => {
                    if (eqChain(project.chain, counter.name)) {
                        datalist.push(project);
                    }
                });

                projects.forEach((project) => {
                    if (eqChain(project.chain, "Polkadot")) {
                        Polkadot++;
                    } else if (eqChain(project.chain, "Kusama")) {
                        Kusama++;
                    } else if (eqChain(project.chain, "Jupiter")) {
                        Jupiter++;
                    }else if (eqChain(project.chain, "Rococo")) {
                        Rococo++;
                    }
                    else if (eqChain(project.chain, "Darwinia")) {
                        Darwinia++;
                    }
                    else if (eqChain(project.chain, "Dock")) {
                        Dock++;
                    }
                    else if (eqChain(project.chain, "Edgeware")) {
                        Edgeware++;
                    }
                    else if (eqChain(project.chain, "Kulupu")) {
                        Kulupu++;
                    }
                    else if (eqChain(project.chain, "Nodle")) {
                        Nodle++;
                    }
                    else if (eqChain(project.chain, "Plasm")) {
                        Plasm++;
                    }
                    else if (eqChain(project.chain, "Stafi")) {
                        Stafi++;
                    }
                    else if (eqChain(project.chain, "Mandala")) {
                        Mandala++;
                    }
                    else if (eqChain(project.chain, "ChainX")) {
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
                setLoading(false);
            });
    };

    //关闭弹窗并且发送请求
    const closeMask = (code: any) => {
        if (code.hel === "ok" && code.val === "") {
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
        console.log('create pro', val);
        apiCreateProject(val)
            .then(() => {
                message.success(t('tip.created'));
                projectsHttp();
            })
            .catch((err: APIError) => {
                console.log("err", err);
                setLoading(false);
                (err.type === APIErrorType.business)
                  && message.error(err.msg);
            });
    };

    return (
      <div className="projects-main">
        <div className="projects">

        </div>
        <div className="user-aside">
          
        </div>
      </div>
    );
};

export default Projects;
