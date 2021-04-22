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
import { StatMonth } from '../../core/types/classes/stat';
import TimeSVG from '../../assets/time.svg';
import ActiveStatusSVG from '../../assets/active-status.svg';
import DeactiveStatusSVG from '../../assets/deactive-status.svg';
import RequestCountsSVG from '../../assets/request-counts.svg';
import BandwidthSVG from '../../assets/bandwidth.svg';
import CopySVG from '../../assets/copy.svg';
import StatusSVG from '../../assets/status.svg';
import NameSVG from '../../assets/name.svg';
import { formatSize, formatTime } from '../../shared/utils';
import { ENDPOINTS_URL, WSS_ENDPOINTS_URL } from '../../config/origin';
import copy from 'copy-to-clipboard';

interface ProjectDetail {
  name: string;
  createtime: string;
  request: string;
  bandwidth: string;
  status: ProjectStatus;
  pid: string;
  psecret: string;
  chain: string;
}

const sumUpMethodCalls = (statMonth: StatMonth) => {
  const sumUp: { [key: string]: number } = {};
  Object.keys(statMonth).forEach(day => {
    const dayMethod = statMonth[day].method;
    Object.keys(dayMethod).forEach(
      method => {
        console.log('method', sumUp[method], dayMethod[method]);
        sumUp[method] = sumUp[method] ? sumUp[method]  + parseInt(dayMethod[method] || '0') : parseInt(dayMethod[method] || '0');
      }
    );
  });
  console.log('sumUp', sumUp);
  return Object.keys(sumUp).map(method => ({
    name: method,
    value: sumUp[method],
  }));
};

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
      symbol: 'circle',
      lineStyle: {
        width: 2,
        color: '#14B071'
      },
      itemStyle: {
        color: '#14B071',
      }
    },
    {
      data: [],
      type: 'bar',
      itemStyle: {
        color: 'rgb(243, 243, 251)'
      }
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
    axisLabel:{ formatter: '{value} MB'}
  },
  series: [
    {
      data: [],
      type: 'line',
      symbolSize: 0,
      lineStyle: {
        color: '#333FFF'
      }
    }
  ],
};

const methodsCallOption: any = {
  tooltip: {
    trigger: 'item',
  },
  legend: {
    orient: 'horizontal',
    left: 'center',
    top: 'bottom',
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

const Details: React.FC = () => {
  const { t } = useTranslation();
  const [ project, setProject ] = useState<ProjectDetail>();
  const params = useParams<{ projectId: string; chain: string }>();
  const requestEchart = useRef<HTMLDivElement>(null);
  const bandwidthEchart = useRef<HTMLDivElement>(null);
  const methodsCallEchart = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const projectPromise = apiGetProjectDetail(params.projectId);
    const dayDetailPromise = apiGetDayDetail(params.projectId);
    Promise.all([projectPromise, dayDetailPromise]).then(([project, dayDetail]) =>
      setProject({
        name: project.name,
        createtime: project.createtime,
        request: dayDetail.request,
        bandwidth: dayDetail.bandwidth,
        status: project.status,
        pid: project.id,
        psecret: project.secret,
        chain: project.chain,
      })
    );
  }, [setProject, params.projectId]);

  useEffect(() => {
    apiGetMonthDetails(params.projectId).then(statMonth => {
      const keys = Object.keys(statMonth);
      
      requestOption.xAxis.data = keys;
      requestOption.series[0].data = keys.map(key => statMonth[key].request);
      requestOption.series[1].data = keys.map(key => statMonth[key].request);

      bandwidthOption.xAxis.data = keys
      bandwidthOption.series[0].data = keys.map(key => parseInt(statMonth[key].bandwidth || '0') / 1024 / 1024);

      methodsCallOption.series[0].data = sumUpMethodCalls(statMonth);
      methodsCallOption.series[0].data = !methodsCallOption.series[0].data.length ?
        [
          { name: 'Null', value: 0 }
        ]
        : methodsCallOption.series[0].data;

      const chart = echarts.init(requestEchart.current!);
      chart.setOption(requestOption);

      const bandwindthChart = echarts.init(bandwidthEchart.current!);
      bandwindthChart.setOption(bandwidthOption);

      const methodsCallChart = echarts.init(methodsCallEchart.current!);
      methodsCallChart.setOption(methodsCallOption);
      console.log('init charts');
    });
  }, [params.projectId]);

  return (
    <div className="project-detail">
      <div className="project-card project-status">
        <Table
          locale={{emptyText: t('No Data')}}
          style={{ marginBottom: '24px' }}
          size="small"
          pagination={false}
          columns={[
            {
              title:
                <div className="th-default">
                  <img src={NameSVG} alt="" style={{ marginRight: '8px' }}/>
                  <span>{t('listPage.projectName')}</span>
                </div>,
              dataIndex: 'name',
              key: 'name',
              render: (text: string) => <span className="td-span-default">{text}</span>,
              width: 150,
            },
            {
              title:
                <div className="th-default">
                  <img src={TimeSVG} alt="" style={{ marginRight: '8px' }}/>
                  <span>{t('listPage.Creation Time')}</span>
                </div>,
              dataIndex: 'createtime',
              key: 'createtime',
              render: (text: string) => <span className="td-span-default">{formatTime(text)}</span>,
              width: 150,
            },
            {
              title:
                <div className="th-default">
                  <img src={RequestCountsSVG} alt="" style={{ marginRight: '8px' }}/>
                  <span>{t('Details.Requests Today')}</span>
                </div>,
              dataIndex: 'request',
              key: 'request',
              render: (text: string) => <span className="td-span-active">{text}</span>,
              width: 150,
            },
            {
              title: 
              <div className="th-default">
                <img src={BandwidthSVG} alt="" style={{ marginRight: '8px' }}/>
                <span>{t('Details.TodayBandwidth')}</span>
              </div>,
              dataIndex: 'bandwidth',
              key: 'bandwidth',
              render: (text: number) => <span className="td-span-active">{formatSize(text)}</span>,
              width: 150,
            },
            {
              title:
              <div className="th-default">
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
          ]}
          dataSource={project ? [project] : []}
          rowKey={record => record.pid}>
        </Table>
        <div>
          <div className="mock-th">
            <span>API</span>
          </div>
          <div className="project-infos">
            <div className="pid-psecret">
              <div className="active-row">PID</div>
              <div className="info-row pid-row">
                <span>{ project?.pid }</span>
                <img className="copy-img" onClick={ () => copy(project?.pid || '')} src={CopySVG} alt=""/>
              </div>
              <div className="active-row">PSECRET</div>
              <div className="info-row psecret-row">
                <span>{ project?.psecret }</span>
                <img className="copy-img" onClick={ () => copy(project?.psecret || '')} src={CopySVG} alt=""/>
              </div>
            </div>
            
            <div className="endpoints">
              <div className="active-row">ENDPOINTS (WSS)</div>
              <div className="info-row endpoints-row">
                { `${WSS_ENDPOINTS_URL}/${project?.chain.toLowerCase()}/${project?.pid}` }
                <img className="copy-img" onClick={ () => copy(`${WSS_ENDPOINTS_URL}/${project?.chain.toLowerCase()}/${project?.pid}`)} src={CopySVG} alt=""/>
              </div>
              <div className="active-row">ENDPOINTS (HTTPS)</div>
              <div className="info-row endpoints-row">
                
              <span>{ `${ENDPOINTS_URL}/${project?.chain.toLowerCase()}/${project?.pid}` }</span>
                <img className="copy-img" onClick={ () => copy(`${ENDPOINTS_URL}/${project?.chain.toLowerCase()}/${project?.pid}`)} src={CopySVG} alt=""/>
              </div>
            </div>
          </div>
        </div>
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
