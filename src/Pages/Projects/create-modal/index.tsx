import React, { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { createPlainModal } from '../../../shared/components/plain-modal';
import './index.css';

const _CreateProjectModel: FC<{
  onModalClose(): void;
}> = ({
  onModalClose,
}): ReactElement => {
  const { t } = useTranslation();

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
          <input placeholder={ t('listPage.PleaseProjectName') }/>
        </div>
      </div>
      <div className="create-project-modal-footer">
        <button onClick={ () => onModalClose() } className="modal-button modal-button-default cancel-margin-right">{ t('modal.cancel') }</button>
        <button className="modal-button modal-button-active">{ t('modal.ok') }</button>
      </div>
    </div>
  );
};

export const CreateProjectModel = createPlainModal(_CreateProjectModel, 440);