import React, { useState, useEffect } from "react";
import "./index.css";
import { Table, } from "antd";
import { useTranslation } from "react-i18next";
import { apiGetProjectList } from "../../core/data/api";
import { APIError } from '../../core/types/classes/error';
import AddProject from '../../assets/add-project.svg';
import { Project } from '../../core/types/classes/project';
import { CreateProjectModel } from './create-modal';
import { useHistory, useParams } from 'react-router-dom';
import NameSVG from '../../assets/name.svg';
import ActiveStatusSVG from '../../assets/active-status.svg';
import DeactiveStatusSVG from '../../assets/deactive-status.svg';
import StatusSVG from '../../assets/deactive-status.svg';
import OperatSVG from '../../assets/operat.svg';
import TimeSVG from '../../assets/time.svg';
import { ProjectStatus } from '../../core/enum';

interface childProps {
    location: any;
    arr: any;
    message: any
}
enum Operation {
  view = 'op-view',
  stop = 'op-stop',
  start = 'op-start',
}

class ViewProject extends Project {
  operations: Operation[];
}

const Projects: React.FC<childProps> = () => {
  const { t } = useTranslation();
  const [ isCreateModalVisible, setCreateIsModalVisible ] = useState<boolean>(false);
  const [ updateSignal, setUpdateSiganl ] = useState(0);
  const [ projects, setProjects ] = useState<ViewProject[]>([]);
  const columns = [
    {
      title: <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
        <img src={NameSVG} alt="" style={{ marginRight: '8px' }}/>
        <span>{t('listPage.projectName')}</span>
      </div>,
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <span className="td-span">{text}</span>,
      width: 150,
    },
    {
      title: <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
        <img src={TimeSVG} alt="" style={{ marginRight: '8px' }}/>
        <span>{t('listPage.Creation Time')}</span>
      </div>,
      dataIndex: 'createtime',
      key: 'creation time',
      render: (text: string) => <span className="td-span">{text}</span>,
      width: 150,
    },
    {
      title: <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
        <img src={StatusSVG} alt="" style={{ marginRight: '8px' }}/>
        <span>{t('listPage.Status')}</span>
      </div>,
      dataIndex: 'status',
      key: 'status',
      render: (text: ProjectStatus) =>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
          {
            text === ProjectStatus.Active ? 
              <img src={ActiveStatusSVG} alt="" style={{ marginRight: '8px' }}/>
              :
              <img src={DeactiveStatusSVG} alt="" style={{ marginRight: '8px' }}/>
          }
          <span className="td-span">{text === ProjectStatus.Active ? t('listPage.Active') : t('listPage.Stop')}</span>
        </div>,
      width: 150,
    },
    {
      title: <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <img src={OperatSVG} alt="" style={{ marginRight: '8px' }}/>
        <span>{t('listPage.Operation')}</span>
      </div>,
      dataIndex: 'operations',
      key: 'operations',
      render: (ops: Operation[], item: Project) => <div style={{ textAlign: 'right' }}>{ ops.map(op => <span onClick={ () => history.push(`/dashboard/details/${item.id}`) } key={op} style={{ textDecoration: 'underline' , color: '#2EA772', margin: '0px 5px', cursor: 'pointer' }}>{t(`listPage.${op}`)}</span>) }</div>,
      width: 60,
    },
  ];
  const params = useParams<{ chain: string }>();
  const history = useHistory();

  useEffect(() => {
    apiGetProjectList().then(
      (_projects = []) => {
        setProjects(
          _projects.filter(project => project.chain === params.chain)
            .map(project => ({...project, operations: [Operation.view]}))
        )
      },
      (e: APIError) => {
        console.log(e, 'get projects')
      },
    );
  }, [setProjects, params, updateSignal]);

  return (
    <div className="projects">
      <button className="modal-button modal-button-active" onClick={ () => setCreateIsModalVisible(true) }>
        <img src={AddProject} alt="" style={{ marginRight: '5px' }} />
        { t('listPage.Create Project') }
      </button>
      <Table
        size="small"
        pagination={false}
        style={{ marginTop: '12px' }}
        columns={columns}
        dataSource={projects}
        rowKey={record => record.id}
      />
      <CreateProjectModel chain={params.chain} isModalVisible={isCreateModalVisible} onModalClose={ () => { setUpdateSiganl(updateSignal + 1); setCreateIsModalVisible(false);} } />
    </div>
  );
};

export default Projects;
