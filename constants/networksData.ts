export const NETWORKS_DATA: {
  id: number;
  key: string;
  img: string;
  protocol: string;
  chainId: number;
  description?: string;
}[] = [
  {
    id: 0,
    key: "eth",
    protocol: "ERC20",
    img: "/static/slider/crypto-icons/eth-icon.svg",
    chainId: 1,
    description:
      "Ethereum is a decentralized blockchain platform that establishes a peer-to-peer network that securely executes and verifies application code, called smart contracts. ",
  },
  {
    id: 1,
    key: "bsc",
    protocol: "BEP20",
    img: "/static/slider/crypto-icons/bnb-icon.svg",
    chainId: 56,
    description:
      "BSC is designed to provide a high-performance infrastructure for decentralized. ",
  },
  {
    id: 2,
    key: "ftm",
    protocol: "ERC20",
    img: "/static/slider/crypto-icons/ftm-icon.svg",
    chainId: 250,
    description:
      "Fantom is a layer-1 blockchain aiming to provide an alternative to the high costs and low speeds about which users of Ethereum often complain.",
  },
  {
    id: 3,
    key: "polygon",
    protocol: "ERC20",
    img: "/static/slider/crypto-icons/polygon-icon.svg",
    chainId: 137,
    description:
      "The Polygon platform, powered by the MATIC token, was launched to connect and grow Ethereum-compatible projects and blockchains. ",
  },
  {
    id: 4,
    key: "harmony",
    protocol: "HRC20",
    img: "/static/slider/crypto-icons/harmony-icon.svg",
    chainId: 1666600000,
    description:
      "Harmony (ONE) is a decentralized blockchain-based platform that offers tools and functionalities for creating, hosting, managing, and using Dapps with maximum scalability and interoperability ",
  },
  {
    id: 5,
    key: "heco",
    protocol: "HRC20",
    img: "/static/slider/crypto-icons/heco-icon.svg",
    chainId: 128,
    description:
      "Huobi Eco Chain (Heco) is an EVM-based blockchain that uses HT as the native currency. ",
  },
  {
    id: 6,
    key: "celo",
    protocol: "ERC20",
    img: "/static/slider/crypto-icons/celo-icon.svg",
    chainId: 42220,
    description:
      "Celo (CGLD) is an open-sourced Proof-of-Stake (PoS) blockchain designed to support stablecoins and tokenized assets with an algorithmic reserve-backed stability mechanism. ",
  },
  {
    id: 7,
    key: "iotex",
    protocol: "XRC20",
    img: "/static/slider/crypto-icons/iotex-icon.svg",
    chainId: 4689,
    description:
      "IoTex is a scalable blockchain network that takes the internet of things (IoT) landscape to a new level. ",
  },
  {
    id: 8,
    key: "moonriver",
    protocol: "ERC20",
    img: "/static/slider/crypto-icons/moonriver-icon.svg",
    chainId: 1285,
    description:
      "Moonriver is a parachain on the Kusama network for crypto projects to expand their reach with a multi-chain design. ",
  },
  {
    id: 9,
    key: "solona",
    protocol: null,
    img: "/static/slider/crypto-icons/solona-icon.svg",
    chainId: null,
    description: "Coming Soon",
  },
  {
    id: 10,
    key: "metis",
    protocol: null,
    img: "/static/slider/crypto-icons/metis-icon.svg",
    chainId: null,
    description: "Coming Soon",
  },
];
