import { useState } from "react";
import { createModel } from "hox";


function HomeHeght() {
  
  const [homeHeght, setHomeHeght] = useState(0);

  const HomeH= (h: any) => {
    setHomeHeght(h);
  }

  return {
    homeHeght,
    HomeH
  };
}

export default createModel(HomeHeght);
