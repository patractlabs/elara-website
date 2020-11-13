import { useState } from "react";
import { createModel } from "hox";

function useCounter() {
  const sidebarName = ["Polkadot", "Kusama", "Jupiter"];
  const [name, setName] = useState("Polkadot");
  const decrement = (code: any) => setName(sidebarName[code - 1]);

  return {
    name,
    decrement,
  };
}

export default createModel(useCounter);
