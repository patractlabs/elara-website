import { useState } from "react";
import { createModel } from "hox";

function useCounter() {
  const sidebarName = ["Polkadot", "Kusama", "Jupiter"];
  const [name, setName] = useState("Polkadot");
  const [nameList, setNameList] = useState({
    Polkadot:0,
    Kusama:0,
    Jupiter:0
  });
  const decrement = (code: number) => setName(sidebarName[code - 1]);
  const setNameLength = (code: any) => setNameList(code);

  return {
    name,
    nameList,
    decrement,
    setNameLength
  };
}

export default createModel(useCounter);
