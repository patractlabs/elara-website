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
import { ProjectStatus } from '../../core/enum';
import { Table } from 'antd';
import { StatMonth } from '../../core/types/classes/stat-week';

interface IProps {
  projectId: string;
}

interface ProjectDetail {
  createtime: string;
  request: number;
  bandwidth: number;
  status: ProjectStatus;
  pid: string;
  psecret: string;
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
  const params = useParams<{ id: string }>();
  const requestEchart = useRef(null);
  const bandwidthEchart = useRef(null);
  const methodsCallEchart = useRef(null);
  
  useEffect(() => {
    const projectPromise = apiGetProjectDetail(params.id);
    const dayDetailPromise = apiGetDayDetail(params.id);
    Promise.all([projectPromise, dayDetailPromise]).then(([project, dayDetail]) => {
      console.log({
        createtime: project.createtime,
        request: dayDetail.request,
        bandwidth: dayDetail.bandwidth,
        status: project.status,
        pid: project.id,
        psecret: project.secret,
      })
      setProjects([{
        createtime: project.createtime,
        request: dayDetail.request,
        bandwidth: dayDetail.bandwidth,
        status: project.status,
        pid: project.id,
        psecret: project.secret,
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

  useEffect(() => {
    apiGetMonthDetails(params.id).then(statMonth => {
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
      console.log('request option', requestOption, 'bandwidth option', bandwidthOption, 'methods call', methodsCallOption);
    });
  }, []);

  return (
    <div className="project-detail">
      <div className="project-card project-status">
        <Table
          pagination={false}
          columns={[
            {
              title: t('listPage.Creation Time'),
              dataIndex: 'createtime',
              key: 'createtime',
              render: (text: string) => <a>{text}</a>,
              width: 150,
            },
            {
              title: t('Details.Today'),
              dataIndex: 'request',
              key: 'request',
              render: (text: string) => <a>{text}</a>,
              width: 150,
            },
            {
              title: t('Details.Status'),
              dataIndex: 'status',
              key: 'status',
              render: (text: string) => <a>{text}</a>,
              width: 150,
            },
          ]}
          dataSource={projects}
          rowKey={record => record.pid}>
        </Table>
        <Table
          pagination={false}
          columns={[
            {
              title: 'PID',
              dataIndex: 'pid',
              key: 'pid',
              render: (text: string) => <a>{text}</a>,
              width: 150,
            },
            {
              title: 'PSECRET',
              dataIndex: 'psecret',
              key: 'psecret',
              render: (text: string) => <a>{text}</a>,
              width: 150,
            },
            {
              title: 'ENDPOINTS',
              dataIndex: 'endpin',
              key: 'psecret',
              render: (text: string) => <a>{text}</a>,
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
