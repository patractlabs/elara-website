import React, { useEffect, useRef, useState } from "react";
import {
  apiGetProjectDetail,
  apiGetDayDetail,
  apiGetMonthDetails,
} from "../../core/data/api";
import * as echarts from 'echarts';
import "./index.css";
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ProjectStatus, Operation } from '../../core/enum';
import { Table } from 'antd';
import { StatMonth } from '../../core/types/classes/stat-week';
import TimeSVG from '../../assets/time.svg';
import ActiveStatusSVG from '../../assets/active-status.svg';
import DeactiveStatusSVG from '../../assets/deactive-status.svg';
import OperatSVG from '../../assets/operat.svg';
import StatusSVG from '../../assets/status.svg';
import { formatTime } from '../../shared/utils';
import { Project } from '../../core/types/classes/project';

interface ProjectDetail {
  createtime: string;
  request: number;
  bandwidth: number;
  status: ProjectStatus;
  pid: string;
  psecret: string;
  operations: Operation[];
}
const sumUpMethodCalls = (statMonth: StatMonth) => {
  const sumUp: { [key: string]: number } = {};
  Object.keys(statMonth).forEach(day => {
    const dayMethod = statMonth[day].method;
    Object.keys(dayMethod).forEach(method => sumUp[method] = sumUp[method] ? sumUp[method] + dayMethod[method] : dayMethod[method]);
  });
  return Object.keys(sumUp).map(method => ({
    name: method,
    value: sumUp[method],
  }));
};
const Details: React.FC = () => {
  const { t } = useTranslation();
  const [ projects, setProjects ] = useState<ProjectDetail[]>([]);
  const params = useParams<{ projectId: string; chain: string }>();
  const requestEchart = useRef(null);
  const bandwidthEchart = useRef(null);
  const methodsCallEchart = useRef(null);
  
  useEffect(() => {
    const projectPromise = apiGetProjectDetail(params.projectId);
    const dayDetailPromise = apiGetDayDetail(params.projectId);
    Promise.all([projectPromise, dayDetailPromise]).then(([project, dayDetail]) => {
      setProjects([{
        createtime: project.createtime,
        request: dayDetail.request,
        bandwidth: dayDetail.bandwidth,
        status: project.status,
        pid: project.id,
        psecret: project.secret,
        operations: [
          project.status === ProjectStatus.Active ? Operation.stop : Operation.start,
          Operation.delete,
        ],
      }]);
    }, () => {}).finally();
  }, []);
  const requestOption: any = {
    xAxis: {
      type: 'category',
      data: [],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [],
        type: 'line',
      },
      {
        data: [],
        type: 'bar',
      },
    ],
  };
  const bandwidthOption: any = {
    xAxis: {
      type: 'category',
      data: [],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [],
        type: 'line',
      }
    ],
  };
  const methodsCallOption: any = {
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: false
          }
        },
        labelLine: {
          show: false,
        },
        data: [],
      }
    ]
  };
  const deleteProject = () => {};
  const stopProject = () => {};
  const startProject = () => {};

  useEffect(() => {
    apiGetMonthDetails(params.projectId).then(statMonth => {
      const keys = Object.keys(statMonth);
      
      requestOption.xAxis.data = keys;
      requestOption.series[0].data = keys.map(key => statMonth[key].request);
      requestOption.series[1].data = keys.map(key => statMonth[key].request);

      bandwidthOption.xAxis.data = keys
      bandwidthOption.series[0].data = keys.map(key => statMonth[key].bandwidth);

      methodsCallOption.series[0].data = sumUpMethodCalls(statMonth);
      methodsCallOption.series[0].data = !methodsCallOption.series[0].data.length ?
        [
          { name: 'Null', value: 0 }
        ]
        : methodsCallOption.series[0].data;

      const chart = echarts.init(
        (requestEchart.current as unknown) as HTMLDivElement
      );
      chart.setOption(requestOption as any);

      const bandwindthChart = echarts.init(
        (bandwidthEchart.current as unknown) as HTMLDivElement
      );
      bandwindthChart.setOption(bandwidthOption as any);

      const methodsCallChart = echarts.init(
        (methodsCallEchart.current as unknown) as HTMLDivElement
      );
      methodsCallChart.setOption(methodsCallOption as any);
    });
  }, []);

  return (
    <div className="project-detail">
      <div className="project-card project-status">
        <Table
          style={{ marginBottom: '24px' }}
          size="small"
          pagination={false}
          columns={[
            {
              title:
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                  <img src={TimeSVG} alt="" style={{ marginRight: '8px' }}/>
                  <span>{t('listPage.Creation Time')}</span>
                </div>,
              dataIndex: 'createtime',
              key: 'createtime',
              render: (text: string) => <span className="td-span-default">{formatTime(text)}</span>,
              width: 150,
            },
            {
              title: t('Details.Requests Today'),
              dataIndex: 'request',
              key: 'request',
              render: (text: string) => <span className="td-span-active">{text}</span>,
              width: 150,
            },
            {
              title: t('Details.TodayBandwidth'),
              dataIndex: 'bandwidth',
              key: 'bandwidth',
              render: (text: string) => <span className="td-span-active">{text}B</span>,
              width: 150,
            },
            {
              title:
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                <img src={StatusSVG} alt="" style={{ marginRight: '8px' }}/>
                <span>{t('Details.Status')}</span>
              </div>,
              dataIndex: 'status',
              key: 'status',
              render: (text: string) => 
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                  {
                    text === ProjectStatus.Active ? 
                      <img src={ActiveStatusSVG} alt="" style={{ marginRight: '8px' }}/>
                      :
                      <img src={DeactiveStatusSVG} alt="" style={{ marginRight: '8px' }}/>
                  }
                  {
                    text === ProjectStatus.Active ?
                      <span className="td-span-active">{ t('listPage.Status-Active')}</span>
                      :
                      <span className="td-span-default">{ t('listPage.Status-Stop')}</span>
                  }
                </div>,
              width: 150,
            },
            {
              title:
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                <img src={OperatSVG} alt="" style={{ marginRight: '8px' }}/>
                <span>{t('listPage.Operation')}</span>
              </div>,
              dataIndex: 'operations',
              key: 'operations',
              render: (ops: Operation[]) =>
                <div style={{ textAlign: 'left' }}>
                  {
                    ops.map((op: Operation) => {
                      switch (op) {
                        case Operation.delete:
                          return <span
                            onClick={deleteProject}
                            key={op}
                            className="td-op">
                              {t(`listPage.${op}`)}
                          </span>
                        case Operation.start:
                          return <span
                            onClick={startProject}
                            key={op}
                            className="td-op">
                              {t(`listPage.${op}`)}
                          </span>
                        case Operation.stop:
                          return <span
                            onClick={stopProject}
                            key={op}
                            className="td-op">
                              {t(`listPage.${op}`)}
                          </span>
                      }
                    })
                  }
                  </div>,
              width: 100,
            },
          ]}
          dataSource={projects}
          rowKey={record => record.pid}>
        </Table>
        <Table
          size="small"
          pagination={false}
          columns={[
            {
              title: 'PID',
              dataIndex: 'pid',
              key: 'pid',
              render: (text: string) => <span className="td-span-default">{text}</span>,
              width: 150,
            },
            {
              title: 'PSECRET',
              dataIndex: 'psecret',
              key: 'psecret',
              render: (text: string) => <span className="td-span-default">{text}</span>,
              width: 150,
            },
            {
              title: 'ENDPOINTS',
              dataIndex: 'endpin',
              key: 'psecret',
              render: (text: string) => <span className="td-span-default">{text}</span>,
              width: 150,
            }
          ]}
          dataSource={projects}
          rowKey={record => record.pid}>
        </Table>
      </div>
      <div className="project-card project-30days-request">
        <h2 className="card-h2">{t('Details.30days-request-counts')}</h2>
        <div>
          <div ref={requestEchart} style={{ width: '100%', height: '355px' }}/>
        </div>
      </div>
      <div className="project-card project-30days-bandwidth">
        <div className="bandwidth">
          <h2 className="card-h2">{t('Details.30days-bandwidth')}</h2>
          <div>
            <div ref={bandwidthEchart} style={{ width: '100%', height: '355px' }} />
          </div> 
        </div>
        <div className="methods-call">
          <h2 className="card-h2 methods-call-h2">{t('Details.30days-callmethods')}</h2>
          <div style={{ display: 'flex', justifyContent: 'center', }}>
            <div ref={methodsCallEchart} style={{ width: '100%', height: '355px' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
