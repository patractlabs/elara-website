import React, { useState, useEffect, useCallback } from "react";
import "./index.css";
import { Table, } from "antd";
import { useTranslation } from "react-i18next";
import { apiGetProjectList } from "../../core/data/api";
import AddProject from '../../assets/add-project.svg';
import { Project } from '../../core/types/classes/project';
import { CreateProjectModel } from './create-modal';
import { useHistory, useParams } from 'react-router-dom';
import NameSVG from '../../assets/name.svg';
import ActiveStatusSVG from '../../assets/active-status.svg';
import DeactiveStatusSVG from '../../assets/deactive-status.svg';
import StatusSVG from '../../assets/status.svg';
import OperatSVG from '../../assets/operat.svg';
import TimeSVG from '../../assets/time.svg';
import { ProjectStatus } from '../../core/enum';
import { formatTime } from '../../shared/utils';
import { useApi } from '../../core/hooks/useApi';

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const [ isCreateModalVisible, setCreateIsModalVisible ] = useState<boolean>(false);
  const [ updateSignal, setUpdateSiganl ] = useState(0);
  const [ projects, setProjects ] = useState<Project[]>([]);
  const params = useParams<{ chain: string }>();
  const history = useHistory();
  const { updateProjectCountsSignal, setUpdateProjectCountsSignal } = useApi();

  const onProjectCreated = useCallback(() => {
    setUpdateSiganl(updateSignal + 1);
    setCreateIsModalVisible(false);
    setUpdateProjectCountsSignal(updateProjectCountsSignal + 1);
  }, [updateSignal, updateProjectCountsSignal, setUpdateProjectCountsSignal]);

  useEffect(() => {
    apiGetProjectList().then(
      _projects =>
        setProjects(
          _projects.filter(project => project.chain === params.chain)
        ),
      () => setProjects([]),
    );
  }, [params.chain, updateSignal]);

  return (
    <div className="projects">
      <button className="modal-button modal-button-active" onClick={ () => setCreateIsModalVisible(true) }>
        <img src={AddProject} alt="" style={{ marginRight: '5px' }} />
        { t('listPage.Create Project') }
      </button>

      <Table
        locale={{ emptyText: t('No Data') }}
        size="small"
        pagination={false}
        style={{ marginTop: '12px' }}
        columns={[
          {
            title:
              <div className="th-default">
                <img src={NameSVG} alt="" style={{ marginRight: '8px' }}/>
                <span>{t('listPage.projectName')}</span>
              </div>,
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => <span className="td-span">{text}</span>,
            width: 150,
          },
          {
            title:
              <div className="th-default">
                <img src={TimeSVG} alt="" style={{ marginRight: '8px' }}/>
                <span>{t('listPage.Creation Time')}</span>
              </div>,
            dataIndex: 'createtime',
            key: 'creation time',
            render: (text: string) => <span className="td-span-default">{formatTime(text)}</span>,
            width: 150,
          },
          {
            title:
              <div className="th-default">
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
              <div className="th-default">
                <img src={OperatSVG} alt="" style={{ marginRight: '8px' }}/>
                <span>{t('listPage.Operation')}</span>
              </div>,
            dataIndex: 'operations',
            key: 'operations',
            render: (_ = undefined, project: Project) =>
              <span
                onClick={() => history.push(`/dashboard/details/${project.chain}/${project.id}`)}
                className="td-op"
              >
                {t(`listPage.op-view`)}
              </span>,
            width: 60,
          },
        ]}
        dataSource={projects}
        rowKey={record => record.id}
      />

      <CreateProjectModel
        chain={params.chain}
        isModalVisible={isCreateModalVisible}
        onModalClose={ onProjectCreated }
      />
    </div>
  );
};

export default Projects;
