import React, { useEffect, useRef, useState } from "react";
import {
  apiGetWeekDetails,
  apiGetProjectDetail,
  apiGetDayDetail,
} from "../../core/data/api";

import "./index.css";
import { APIError, APIErrorType } from '../../core/types/classes/error';
import { Project } from '../../core/types/classes/project';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ProjectStatus } from '../../core/enum';
import { Table } from 'antd';

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

const Details: React.FC = () => {
  const { t,i18n } = useTranslation();
  const [ project, setProject ] = useState<ProjectDetail>({} as any);
  const params = useParams<{ id: string }>();
  const requestEchart = useRef(null);
  const bandwidthEchart = useRef(null);
  let chartInstance = null;
  
  useEffect(() => {
    const projectPromise = apiGetProjectDetail(params.id);
    const dayDetailPromise = apiGetDayDetail(params.id);
    Promise.all([projectPromise, dayDetailPromise]).then(([project, dayDetail]) => {
      setProject({
        createtime: project.createtime,
        request: dayDetail.request,
        bandwidth: dayDetail.bandwidth,
        status: project.status,
        pid: project.id,
        psecret: project.secret,
      });
    }, () => {}).finally();
  }, []);

  useEffect(() => {
    const myChart = echarts.getInstanceByDom(
      (requestEchart.current as unknown) as HTMLDivElement
    );
    if (myChart) chartInstance = myChart;
    else
      chartInstance = echarts.init(
        (requestEchart.current as unknown) as HTMLDivElement
      );
  }, [project]);

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
          dataSource={[project]}
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
          dataSource={[project]}
          rowKey={record => record.pid}>
        </Table>
      </div>
      <div className="project-card project-30days-request">
        <h2 className="card-h2">{t('Details.30days-request-counts')}</h2>
        <div>
          <div className="requestEchart" ref={requestEchart} />
        </div>
      </div>
      <div className="project-card project-30days-bandwidth">
        <h2 className="card-h2">{t('Details.30days-bandwidth')}</h2>
        <div>
          <div className="bandwidthEchart" ref={bandwidthEchart} />
        </div>
      </div>
    </div>
  );
};

export default Details;
