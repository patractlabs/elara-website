
import React, { useCallback, useEffect, useState } from 'react';
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
import img16 from '../../assets/moonbeam.png';
import img17 from '../../assets/statemine.svg';
import img18 from '../../assets/karura.svg';
import img19 from '../../assets/moonriver.svg';

const DashboardContext: React.Context<{
  chains: Chain[];
  update: () => void;
  liveCollapse: boolean;
  setLiveCollapse: React.Dispatch<React.SetStateAction<boolean>>;
  testCollapse: boolean;
  setTestCollapse: React.Dispatch<React.SetStateAction<boolean>>;
  kusamaParaCollapse: boolean,
  setKusamaParaCollapse: React.Dispatch<React.SetStateAction<boolean>>;
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
  ChainName.Moonbase,
  ChainName.Statemine,
  ChainName.Westmint,
  ChainName.Karura,
  ChainName.Moonriver
];

const getChains = (projects: Project[] = []): Chain[] => {
  const chainsMap: {
    [key: string]: { owner: string; title: string; img: any, count: number } & Pick<Chain, 'networkType'>
  } = {
    Polkadot: {
      owner: 'polkadot',
      title: 'Polkadot',
      img: img1,
      count: 0,
      networkType: 'live',
    },
    Kusama: {
      owner: 'kusama',
      title: 'Kusama',
      img: img2,
      count: 0,
      networkType: 'live',
    },
    Jupiter: {
      owner: 'jupiter',
      title: 'Jupiter',
      img: img3,
      count: 0,
      networkType: 'test'
    },
    Rococo: {
      owner: 'Rococo',
      title: 'Rococo',
      img: img4,
      count: 0,
      networkType: 'test'
    },
    Darwinia: {
      owner: 'Darwinia',
      title: 'Darwinia',
      img: img5,
      count: 0,
      networkType: 'live',
    },
    Dock: {
      owner: 'Dock',
      title: 'Dock',
      img: img6,
      count: 0,
      networkType: 'live',
    },
    Edgeware: {
      owner: 'Edgeware',
      title: 'Edgeware',
      img: img7,
      count: 0,
      networkType: 'live',
    },
    Kulupu: {
      owner: 'Kulupu',
      title: 'Kulupu',
      img: img8,
      count: 0,
      networkType: 'live',
    },
    Nodle: {
      owner: 'Nodle',
      title: 'Nodle',
      img: img9,
      count: 0,
      networkType: 'live',
    },
    Plasm: {
      owner: 'Plasm',
      title: 'Plasm',
      img: img10,
      count: 0,
      networkType: 'live',
    },
    Stafi: {
      owner: 'Stafi',
      title: 'Stafi',
      img: img11,
      count: 0,
      networkType: 'live',
    },
    Mandala: {
      title: 'Mandala',
      owner: 'acala',
      img: img12,
      count: 0,
      networkType: 'test'
    },
    ChainX: {
      owner: 'ChainX',
      title: 'ChainX',
      img: img13,
      count: 0,
      networkType: 'live',
    },
    Westend: {
      owner: 'Westend',
      title: 'Westend',
      img: img14,
      count: 0,
      networkType: 'test'
    },
    Subsocial: {
      owner: 'Subsocial',
      title: 'Subsocial',
      img: img15,
      count: 0,
      networkType: 'live'
    },
    Moonbase: {
      title: 'Moonbase Alpha',
      owner: 'moonbeam',
      img: img16,
      count: 0,
      networkType: 'test'
    },
    Statemine: {
      title: 'Statemine',
      owner: 'kusama',
      img: img17,
      count: 0,
      networkType: 'live',
    },
    Westmint: {
      title: 'Westmint',
      owner: 'Westend',
      img: img17,
      count: 0,
      networkType: 'test'
    },
    Karura: {
      title: 'Karura',
      owner: 'Kusama',
      img: img18,
      count: 0,
      networkType: 'kusamaPara'
    },
    Moonriver: {
      title: 'Moonriver',
      owner: 'Kusama',
      img: img19,
      count: 0,
      networkType: 'kusamaPara'
    },
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
  const [kusamaParaCollapse, setKusamaParaCollapse] = useState<boolean>(false);

  useEffect(() => {
    apiGetProjectList().then(
      projects => {
        console.log('projects', projects);
        setChains(getChains(projects))
      },
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setChains, updateSignal]);

  const update = useCallback(() => setUpdateSignal(updateSignal + 1), [setUpdateSignal, updateSignal]);

  return (
    <DashboardContext.Provider value={{
      chains,
      update,
      liveCollapse,
      setLiveCollapse,
      testCollapse,
      setTestCollapse,
      kusamaParaCollapse,
      setKusamaParaCollapse
    }} >
      {children}
    </DashboardContext.Provider>
  );
});

export { DashboardContext, DashboardProvider };
