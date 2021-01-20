import { useState } from "react";
import { createModel } from "hox";


function useCounter() {
  const sidebarName = ["Polkadot", "Kusama", "Jupiter","Rococo","Darwinia","Dock","Edgeware","Kulupu","Nodle","Plasm","Stafi","Mandala"];
  const [name, setName] = useState("Polkadot");
  const [nameList, setNameList] = useState({
    Polkadot:0,
    Kusama:0,
    Jupiter:0,
    Rococo:0,
    Darwinia:0,
    Dock:0,
    Edgeware:0,
    Kulupu:0,
    Nodle:0,
    Plasm:0,
    Stafi:0,
    Mandala:0
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
