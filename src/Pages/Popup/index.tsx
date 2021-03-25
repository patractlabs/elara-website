import React, { useState, useEffect } from "react";
import { Modal, Input } from "antd";
import { useTranslation } from "react-i18next";

import "./index.css";

interface chilrenProps {
  onCancel: () => void;
  changeOff: Function;
  msg: boolean;
}

const Popup: React.FC<chilrenProps> = ({ msg, changeOff }) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(msg);
  const [inputVal, setInputVal] = useState("");
  const [inputTitle, setInputTitle] = useState(false);

  useEffect(() => {
    setInputVal("");
    setVisible(msg);
    setInputTitle(false);
  }, [msg]);

  const getInputVal = (e: any) => {
    let reg = /[a-zA-Z]{4,32}/;
    if (!reg.test(e.target.value)) {
      setInputTitle(true);
    } else {
      setInputTitle(false);
    }
    setInputVal(e.target.value);
  };

  return (
    <div>
      <Modal
        title={t('listPage.Create Project')}
        visible={visible}
        closable={false}
        onOk={() => {
          // handleCancel();
          changeOff({
            hel: "ok",
            off: true,
            val: inputVal,
          });
        }}
        onCancel={() => {
          changeOff({
            hel: "onCancel",
            off: false,
            val: inputVal,
          });
        }}
      >
        <p className="popupPP">{t('listPage.projectName')}</p>
        <Input
          placeholder={t('listPage.PleaseProjectName')}
          value={inputVal}
          onChange={(e) => {
            getInputVal(e);
          }}
        />
        <p style={{ display: inputTitle ? "block" : "none", color: "#ff4d4f" }}>
        {t('listPage.FormatError')}
        </p>
      </Modal>
    </div>
  );
};

export default Popup;
