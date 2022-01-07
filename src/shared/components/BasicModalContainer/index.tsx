import { FC, ReactNode } from 'react'
import { Modal } from 'antd'
import { useTranslation } from 'react-i18next'

import closeImg from './images/close.svg'
import './index.css'

interface IBasicModalProps {
  visible: boolean
  title: ReactNode
  okText: string
  onOk: () => void
  onCancel: ()=>void
}
const BasicModal: FC<IBasicModalProps> = (props) => {

    const { title, okText, visible, onOk, onCancel, children } = props
    const { t } = useTranslation()

  return (
    <Modal
      wrapClassName="basic-modal"
      title={title}
      closeIcon={<img src={closeImg} alt="close" />}
      centered
      visible={visible}
      okText={okText}
      cancelText={t('modal.cancel')}
      onOk={onOk}
      onCancel={onCancel}
      width={480}
    >
      {children}
    </Modal>
  )
}

export default BasicModal