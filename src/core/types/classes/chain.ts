import img1 from '../../../assets/Polkadot.svg'
import img2 from '../../../assets/Kusama.svg'
import img3 from '../../../assets/Jupiter.svg'
import img4 from '../../../assets/Rococo.svg'
import img5 from '../../../assets/Darwinia.svg'
import img6 from '../../../assets/Dock.svg'
import img7 from '../../../assets/Edgeware.svg'
import img8 from '../../../assets/Kulupu.svg'
import img9 from '../../../assets/Nodle.svg'
import img10 from '../../../assets/Plasm.svg'
import img11 from '../../../assets/Stafi.svg'
import img12 from '../../../assets/Mandala.svg'
import img13 from '../../../assets/ChainX.svg'
import img14 from '../../../assets/Westend.svg'
import img15 from '../../../assets/Subsocial.svg'
import img16 from '../../../assets/Moonbase.svg'
import img17 from '../../../assets/Statemine.svg'
import img18 from '../../../assets/Karura.svg'
import img19 from '../../../assets/Moonriver.svg'
import img20 from '../../../assets/Bifrost.svg'
import img21 from '../../../assets/Statemine.svg'
import img22 from '../../../assets/Shell.svg'
import LiveNetworks from '../../../shared/components/svg/LiveNetworks'
import TestNetworks from '../../../shared/components/svg/TestNetworks'
import PolkadotParachains from '../../../shared/components/svg/PolkadotParachains'
import KusamaParachains from '../../../shared/components/svg/KusamaParachains'
import WestendParachains from '../../../shared/components/svg/WestendParachains'
import RococoParachains from '../../../shared/components/svg/RococoParachains'

export const chainIconMap = {
  Polkadot: img1,
  Kusama: img2,
  Jupiter: img3,
  Rococo: img4,
  Darwinia: img5,
  Dock: img6,
  Edgeware: img7,
  Kulupu: img8,
  Nodle: img9,
  Plasm: img10,
  Stafi: img11,
  Mandala: img12,
  Chainx: img13,
  Westend: img14,
  Subsocial: img15,
  Moonbasealpha: img16,
  Statemine: img17,
  Karura: img18,
  Moonriver: img19,
  Bifrost: img20,
  Westmint: img21,
  Statemint: img22,
}
export const subMenuMap: Record<
  NetworkType,
  { title: string; icon: typeof LiveNetworks }
> = {
  polkadot: { title: 'Polkadot Parchains', icon: PolkadotParachains },
  kusama: { title: 'Kusama Parachains', icon: KusamaParachains },
  westend: { title: 'Westend Parachains', icon: WestendParachains },
  rococo: { title: 'Rococo Parachains', icon: RococoParachains },
  live: { title: 'Live Networks', icon: LiveNetworks },
  test: { title: 'Test Networks', icon: TestNetworks },
}

export type NetworkType =
  | 'test'
  | 'live'
  | 'polkadot'
  | 'kusama'
  | 'westend'
  | 'rococo'

export interface Chain {
  [key: string]: any
  id: string
  name: keyof typeof chainIconMap
  team: string
  network: NetworkType
  createdAt: string
  updatedAt: string
  deletedAt: null
  count?: number
  status?: 'active' | 'suspend' | 'unknown'
}

export type Menu = Partial<Record<NetworkType, Chain[]>> & {
  [index: string]: Chain[]
}
