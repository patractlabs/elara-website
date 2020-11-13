import React, { useState, useEffect, useRef } from "react";
import { Modal, Input } from "antd";

import "./index.css";

interface chilrenProps {
  onCancel: () => void;
  changeOff: Function;
  msg: boolean;
}

const Popup: React.FC<chilrenProps> = ({ onCancel, msg, changeOff }) => {
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
        title="新建项目"
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
        <p className="popupPP">项目名称</p>
        <Input
          placeholder="请输入项目名称"
          value={inputVal}
          onChange={(e) => {
            getInputVal(e);
          }}
        />
        <p style={{ display: inputTitle ? "block" : "none", color: "#ff4d4f" }}>
          格式错误，正常格式：英文大小写字母，长度4-32
        </p>
      </Modal>
    </div>
  );
};

export default Popup;
