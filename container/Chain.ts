import type { AddEthereumChainParameter } from "@web3-react/types";
import apiObj from "configs/api.json";
import axios from "axios";

const BaseUrl = apiObj["BaseUrl"];

const ETH: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Ether",
  symbol: "ETH",
  decimals: 18,
};

const BNB: AddEthereumChainParameter["nativeCurrency"] = {
  name: "BNB",
  symbol: "BNB",
  decimals: 18,
};

const FTM: AddEthereumChainParameter["nativeCurrency"] = {
  name: "FTM",
  symbol: "FTM",
  decimals: 18,
};

const MATIC: AddEthereumChainParameter["nativeCurrency"] = {
  name: "MATIC",
  symbol: "MATIC",
  decimals: 18,
};

const ONE: AddEthereumChainParameter["nativeCurrency"] = {
  name: "ONE",
  symbol: "ONE",
  decimals: 18,
};

const HT: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Huobi ECO Chain Native Token",
  symbol: "ONE",
  decimals: 18,
};

const CELO: AddEthereumChainParameter["nativeCurrency"] = {
  name: "CELO",
  symbol: "CELO",
  decimals: 18,
};

const IOTX: AddEthereumChainParameter["nativeCurrency"] = {
  name: "IoTeX",
  symbol: "IOTX",
  decimals: 18,
};

const MOVR: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Moonriver",
  symbol: "MOVR",
  decimals: 18,
};

interface BasicChainInformation {
  urls: string[];
  name: string;
}

interface ExtendedChainInformation extends BasicChainInformation {
  nativeCurrency: AddEthereumChainParameter["nativeCurrency"];
  blockExplorerUrls: AddEthereumChainParameter["blockExplorerUrls"];
}

function isExtendedChainInformation(
  chainInformation: BasicChainInformation | ExtendedChainInformation
): chainInformation is ExtendedChainInformation {
  return (chainInformation as ExtendedChainInformation)
    ? !!(chainInformation as ExtendedChainInformation).nativeCurrency
    : null;
}

export function getAddChainParameters(
  chainList,
  chainId: number
): AddEthereumChainParameter | number {
  const chainInformation = chainList.find((chain) => chain.chainId === chainId);

  if (isExtendedChainInformation(chainInformation)) {
    return {
      chainId,
      chainName: chainInformation.name,
      nativeCurrency: chainInformation.nativeCurrency,
      rpcUrls: chainInformation.urls,
      blockExplorerUrls: chainInformation.blockExplorerUrls,
    };
  } else {
    return chainId;
  }
}

export const CHAINS: {
  [chainId: number]: BasicChainInformation | ExtendedChainInformation;
} = {
  1: {
    urls: [
      process.env.infuraKey
        ? `https://mainnet.infura.io/v3/${process.env.infuraKey}`
        : undefined,
      process.env.alchemyKey
        ? `https://eth-mainnet.alchemyapi.io/v2/${process.env.alchemyKey}`
        : undefined,
      "https://cloudflare-eth.com",
    ].filter((url) => url !== undefined),
    name: "Mainnet",
  },
  3: {
    urls: [
      process.env.infuraKey
        ? `https://ropsten.infura.io/v3/${process.env.infuraKey}`
        : undefined,
    ].filter((url) => url !== undefined),
    name: "Ropsten",
  },
  4: {
    urls: [
      process.env.infuraKey
        ? `https://rinkeby.infura.io/v3/${process.env.infuraKey}`
        : undefined,
    ].filter((url) => url !== undefined),
    name: "Rinkeby",
  },
  5: {
    urls: [
      process.env.infuraKey
        ? `https://goerli.infura.io/v3/${process.env.infuraKey}`
        : undefined,
    ].filter((url) => url !== undefined),
    name: "Görli",
  },
  42: {
    urls: [`https://kovan.infura.io/v3/${process.env.infuraKey}`],
    name: "Kovan",
  },
  // Optimism
  10: {
    urls: [
      process.env.infuraKey
        ? `https://optimism-mainnet.infura.io/v3/${process.env.infuraKey}`
        : undefined,
      "https://mainnet.optimism.io",
    ].filter((url) => url !== undefined),
    name: "Optimism",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://optimistic.etherscan.io"],
  },
  69: {
    urls: [
      process.env.infuraKey
        ? `https://optimism-kovan.infura.io/v3/${process.env.infuraKey}`
        : undefined,
      "https://kovan.optimism.io",
    ].filter((url) => url !== undefined),
    name: "Optimism Kovan",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://kovan-optimistic.etherscan.io"],
  },
  // Arbitrum
  42161: {
    urls: [
      process.env.infuraKey
        ? `https://arbitrum-mainnet.infura.io/v3/${process.env.infuraKey}`
        : undefined,
      "https://arb1.arbitrum.io/rpc",
    ].filter((url) => url !== undefined),
    name: "Arbitrum One",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://arbiscan.io"],
  },
  421611: {
    urls: [
      process.env.infuraKey
        ? `https://arbitrum-rinkeby.infura.io/v3/${process.env.infuraKey}`
        : undefined,
      "https://rinkeby.arbitrum.io/rpc",
    ].filter((url) => url !== undefined),
    name: "Arbitrum Testnet",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://testnet.arbiscan.io"],
  },
  // Polygon
  // 137: {
  //   urls: [
  //     process.env.infuraKey
  //       ? `https://polygon-mainnet.infura.io/v3/${process.env.infuraKey}`
  //       : undefined,
  //     "https://polygon-rpc.com",
  //   ].filter((url) => url !== undefined),
  //   name: "Polygon Mainnet",
  //   nativeCurrency: MATIC,
  //   blockExplorerUrls: ["https://polygonscan.com"],
  // },
  // 80001: {
  //   urls: [
  //     process.env.infuraKey
  //       ? `https://polygon-mumbai.infura.io/v3/${process.env.infuraKey}`
  //       : undefined,
  //   ].filter((url) => url !== undefined),
  //   name: "Polygon Mumbai",
  //   nativeCurrency: MATIC,
  //   blockExplorerUrls: ["https://mumbai.polygonscan.com"],
  // },
  56: {
    urls: ["https://bsc-dataseed.binance.org"],
    name: "Smart Chain (BSC)",
    blockExplorerUrls: ["https://bscscan.com"],
  },
  97: {
    urls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
    name: "BSC - Testnet",
    nativeCurrency: BNB,
    blockExplorerUrls: ["https://testnet.bscscan.com"],
  },
  250: {
    urls: ["https://rpc.ftm.tools"],
    name: "Fantom",
    blockExplorerUrls: ["https://ftmscan.com"],
  },
  4002: {
    urls: ["https://rpc.testnet.fantom.network"],
    name: "Fantom - Testnet",
    nativeCurrency: FTM,
    blockExplorerUrls: ["https://testnet.ftmscan.com"],
  },
  137: {
    urls: [
      process.env.infuraKey
        ? `https://polygon-mainnet.infura.io/v3/${process.env.infuraKey}`
        : undefined,
      "https://polygon-rpc.com",
    ].filter((url) => url !== undefined),
    name: "Polygon Mainnet",
    nativeCurrency: MATIC,
    blockExplorerUrls: ["https://polygonscan.com"],
  },
  80001: {
    urls: [
      process.env.infuraKey
        ? `https://polygon-mumbai.infura.io/v3/${process.env.infuraKey}`
        : undefined,
    ].filter((url) => url !== undefined),
    name: "Polygon Mumbai",
    nativeCurrency: MATIC,
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  },
};

// axios
//   .get(`${BaseUrl}/create-tokens/supportedNetworks`)
//   .then(function (res: any) {
//     const supportedChains = res.data;

//     let chains = {};

//     supportedChains.map((chain) => {
//       chains[chain.chainId] = { ...chain };
//     });

//     CHAINS = chains;
//   })
//   .catch(function (err: any) {});

export const URLS: { [chainId: number]: string[] } = Object.keys(
  CHAINS
).reduce<{ [chainId: number]: string[] }>((accumulator, chainId) => {
  const validURLs: string[] = CHAINS[Number(chainId)].urls;

  if (validURLs.length) {
    accumulator[Number(chainId)] = validURLs;
  }

  return accumulator;
}, {});

export enum ChainIDs {
  BSC = 56,
  BSCTESTNET = 97,
  FANTOM = 250,
  FANTOMTESTNET = 4002,
  POLYGON = 137,
  POLYGONTESTNET = 80001,
  HARMONY = 1666600000,
  HARMONYTESTNET = 1666700000,
  KOVAN = 42,
  ETHEREUM = 1,
  HECO = 128,
  HECOTESTNET = 256,
  CELO = 42220,
  CELOTESTNET = 44787,
  IOTEX = 4689,
  IOTEXTESTNET = 4690,
  MOONRIVER = 1285,
}
