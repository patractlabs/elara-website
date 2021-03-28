import React, { FC, ReactElement } from "react";
import { Modal } from 'antd';
import './index.css';

interface IProps {
  isModalVisible: boolean;
  onModalClose(): void;
}

export const createPlainModal = (ChildComponent: FC<any>, width = 520) => {
  const WrappedComponent: FC<any> = (props: any): ReactElement => {
  
  return (
      <Modal
        width={`${width}px`}
        wrapClassName="plain-modal-wrap"
        visible={props.isModalVisible}
        closable={false}
        onCancel={ props.onModalClose }
        footer={null}
        title={null}>
          <ChildComponent {...props} />
      </Modal>
    );
  }

  return WrappedComponent;
};
