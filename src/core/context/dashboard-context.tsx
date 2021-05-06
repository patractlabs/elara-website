
import React, { useEffect, useState } from 'react';
import { ChainName } from '../enum';
import { Project } from '../../core/types/classes/project';
import { apiGetProjectList } from '../data/api';
import { Chain } from '../types/classes/chain';
import img1 from '../../assets/Polkadot.svg';
import img2 from '../../assets/Kusama.svg';
import img3 from '../../assets/Jupiter.svg';
import img4 from '../../assets/Rococo.svg';
import img5 from '../../assets/Darwinia.png';
import img6 from '../../assets/dock.webp';
import img7 from '../../assets/Edgeware.svg';
import img8 from '../../assets/Kulupu.svg';
import img9 from '../../assets/Nodle.svg';
import img10 from '../../assets/Plasm.png';
import img11 from '../../assets/stafi.webp';
import img12 from '../../assets/Mandala.svg';
import img13 from '../../assets/ChainX.png';
import img14 from '../../assets/Westend.svg';
import img15 from '../../assets/subsocial.svg';

const DashboardContext: React.Context<{
  chains: Chain[];
  updateSignal: number;
  setUpdateSignal: React.Dispatch<React.SetStateAction<number>>;
  liveCollapse: boolean;
  setLiveCollapse: React.Dispatch<React.SetStateAction<boolean>>;
  testCollapse: boolean;
  setTestCollapse: React.Dispatch<React.SetStateAction<boolean>>;
}> = React.createContext({} as any);
interface Props {
  children: React.ReactNode;
}

const chainNames = [
  ChainName.Polkadot,
  ChainName.Kusama,
  ChainName.Jupiter,
  ChainName.Rococo,
  ChainName.Darwinia,
  ChainName.Dock,
  ChainName.Edgeware,
  ChainName.Kulupu,
  ChainName.Nodle,
  ChainName.Plasm,
  ChainName.Stafi,
  ChainName.Mandala,
  ChainName.ChainX,
  ChainName.Westend,
  ChainName.Subsocial,
];

const getChains = (projects: Project[] = []): Chain[] => {
  const chainsMap: {
    [key: string]: { img: any, count: number, liveNetwork?: boolean }
  } = {
    Polkadot: {
      img: img1,
      count: 0,
      liveNetwork: true,
    },
    Kusama: {
      img: img2,
      count: 0,
      liveNetwork: true,
    },
    Jupiter: {
      img: img3,
      count: 0,
    },
    Rococo: {
      img: img4,
      count: 0,
    },
    Darwinia: {
      img: img5,
      count: 0,
      liveNetwork: true,
    },
    Dock: {
      img: img6,
      count: 0,
      liveNetwork: true,
    },
    Edgeware: {
      img: img7,
      count: 0,
      liveNetwork: true,
    },
    Kulupu: {
      img: img8,
      count: 0,
      liveNetwork: true,
    },
    Nodle: {
      img: img9,
      count: 0,
      liveNetwork: true,
    },
    Plasm: {
      img: img10,
      count: 0,
      liveNetwork: true,
    },
    Stafi: {
      img: img11,
      count: 0,
      liveNetwork: true,
    },
    Mandala: {
      img: img12,
      count: 0,
    },
    ChainX: {
      img: img13,
      count: 0,
      liveNetwork: true,
    },
    Westend: {
      img: img14,
      count: 0,
    },
    Subsocial: {
      img: img15,
      count: 0,
      liveNetwork: true,
    }
  };

  // countup every networks' projects
  projects.forEach(project => {
    const upperCaseChainName = project.chain.toUpperCase();
    const chainName = chainNames.find(_chainName => _chainName.toUpperCase() === upperCaseChainName) || '';
    chainsMap[chainName] && chainsMap[chainName].count ++;
  });

  const chains: Chain[] = [];
  chainNames
    .filter(chainName => !!chainsMap[chainName].count)
    .forEach(chainName => chains.push({
      name: chainName,
      ...chainsMap[chainName],
    }));
  chainNames
    .filter(chainName => !chainsMap[chainName].count)
    .forEach(chainName => chains.push({
      name: chainName,
      ...chainsMap[chainName],
    }));

  return chains;
};

const DashboardProvider = React.memo(({ children }): React.ReactElement<Props> => {
  const [ chains, setChains ] = useState<Chain[]>([]);
  const [ updateSignal, setUpdateSignal ] = useState<number>(0);
  const [ liveCollapse, setLiveCollapse ] = useState<boolean>(false);
  const [ testCollapse, setTestCollapse ] = useState<boolean>(false);

  useEffect(() => {
    apiGetProjectList().then(
      projects => setChains(getChains(projects)),
      () => setChains(chains && chains.length ? chains : []),
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setChains, updateSignal]);

  return (
    <DashboardContext.Provider value={{
      chains,
      updateSignal,
      setUpdateSignal,
      liveCollapse,
      setLiveCollapse,
      testCollapse,
      setTestCollapse,
    }} >
      {children}
    </DashboardContext.Provider>
  );
});

export { DashboardContext, DashboardProvider };
