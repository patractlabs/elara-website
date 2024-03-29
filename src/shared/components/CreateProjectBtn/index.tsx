import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "./Modal";
import "./index.css";

const CreateProjectBtn: FC<{
  chain?: string
  onCloseCallback?: () => void
}> = ({ chain, onCloseCallback }) => {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)
  return (
    <>
      <button className="add-button" onClick={() => setVisible(true)}>
        {t('listPage.Create Project')}
      </button>
      <Modal
        visible={visible}
        setVisible={setVisible}
        chain={chain}
        closeCallBack={onCloseCallback}
      />
    </>
  )
}

export default CreateProjectBtn;
