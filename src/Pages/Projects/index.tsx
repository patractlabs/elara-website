import React, { useState, useEffect } from "react";
import "./index.css";
import { Button, Table, } from "antd";
import { useTranslation } from "react-i18next";

import { apiGetProjectList } from "../../core/data/api";
import { APIError } from '../../core/types/classes/error';
import AddProject from '../../assets/add-project.svg';
import { Project } from '../../core/types/classes/project';
import { CreateProjectModel } from './create-modal';

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
  const [ projects, setProjects ] = useState<ViewProject[]>([]);
  const columns = [
    {
      title: t('listPage.projectName'),
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
      width: 150,
    },
    {
      title: t('listPage.Creation Time'),
      dataIndex: 'createtime',
      key: 'creation time',
      render: (text: string) => <a>{text}</a>,
      width: 150,
    },
    {
      title: t('listPage.Status'),
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => <a>{text}</a>,
      width: 150,
    },
    {
      title: t('listPage.Operation'),
      dataIndex: 'operations',
      key: 'operations',
      render: (ops: Operation[]) => <div>{ ops.map(op => <span key={op} style={{ textDecoration: 'underline' , color: '#2EA772', margin: '0px 5px' }}>{t(`listPage.${op}`)}</span>) }</div>,
      width: 150,
    },
  ];

  useEffect(() => {
    apiGetProjectList().then(
      _projects => {
        setProjects(
          _projects.filter(project => project.chain === 'Polkadot')
            .map(project => ({...project, operations: [Operation.view, Operation.stop]}))
        )
      },
      (e: APIError) => {
        console.log(e, 'get projects')
      },
    );
  }, [setProjects]);

  return (
    <div className="projects">
      <button className="modal-button modal-button-active" onClick={ () => setCreateIsModalVisible(true) }>
        <img src={AddProject} alt="" style={{ marginRight: '5px' }} />
        { t('listPage.Create Project') }
      </button>
      <Table
        style={{ marginTop: '12px' }}
        columns={columns}
        dataSource={projects}
        rowKey={record => record.id}
      />
      <CreateProjectModel isModalVisible={isCreateModalVisible} onModalClose={ () => setCreateIsModalVisible(false) } />
    </div>
  );
};

export default Projects;
