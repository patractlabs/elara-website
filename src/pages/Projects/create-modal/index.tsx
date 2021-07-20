import React, { FC, ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, message } from 'antd';
import { apiCreateProject } from '../../../core/data/api';
import { createPlainModal } from '../../../shared/components/plain-modal';
import './index.css';
import { useApi } from '../../../core/hooks/useApi';

const _CreateProjectModel: FC<{
  onModalClose(): void;
  chain: string;
}> = ({
  onModalClose,
  chain,
}): ReactElement => {
  const [ projectName, setProjectName ] = useState<string>('');
  const [ isValid, setIsValid ] = useState<boolean>(false);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const { t } = useTranslation();
  const { updateUser } = useApi();
  const createProject = () => {
    setIsLoading(true);
    apiCreateProject({
      name: projectName,
      chain
    }).then(
      () => {
        onModalClose();
        updateUser();
        message.success(t('tip.created'));
      },
      () => message.error(t('tip.fail')),
    ).finally(() => setIsLoading(false)) ;
  };
  const onInputChange = (name: string) => {
    let reg = /[a-zA-Z]{4,32}/;
    setProjectName(name);
    setIsValid(reg.test(name));
  };
  return (
    <div className="create-project-modal">
      <div className="create-project-modal-title">
        { t('listPage.Create Project') }
      </div>
      <div className="create-project-modal-body">
        <div className="project-name">
          <span>{ t('listPage.projectName') }</span>
        </div>
        <div className="project-input">
          <input style={{ width: '100%' }} placeholder={ t('listPage.PleaseProjectName') } value={projectName} onChange={ e => onInputChange(e.target.value) }/>
          <p style={{ display: !projectName || isValid ? 'none' : 'block', color: '#ff4d4f' }}>
            {t('listPage.FormatError')}
          </p>
        </div>
      </div>
      <div className="create-project-modal-footer">
        <button onClick={ () => onModalClose() } className="modal-button modal-button-default cancel-margin-right">{ t('modal.cancel') }</button>
        <Button type="primary" disabled={!isValid} loading={isLoading} onClick={createProject} className="modal-button modal-button-active">{ t('modal.ok') }</Button>
      </div>
    </div>
  );
};

export const CreateProjectModel = createPlainModal(_CreateProjectModel);