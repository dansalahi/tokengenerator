import React, { useEffect, useState } from "react";
import { Network } from "@web3-react/network";
import { WalletConnect } from "@web3-react/walletconnect";
import type { MetaMask } from "@web3-react/metamask";
import type { CoinbaseWallet } from "@web3-react/coinbase-wallet";
import { ChainIDs } from "container/Chain";
const axios = require("axios");

type WalletConnectType = "MetaMask" | "WalletConnect" | null;
type Connector = MetaMask | WalletConnect | null;
// type Connector = MetaMask | WalletConnect | CoinbaseWallet | Network
export type ContextType = {
  setWalletConnectType: (wallet: WalletConnectType) => void;
  currentWallet: WalletConnectType;
  // setConnector: (connector: Connector) => void;
  // getConnector: () => Connector;
  setWalletConnector: React.Dispatch<React.SetStateAction<Connector>>;
  walletConnector: Connector;
  currentChain: ChainIDs;
  setCurrentChain: React.Dispatch<React.SetStateAction<ChainIDs>>;
  chainList: any[];
  setChainList: React.Dispatch<React.SetStateAction<[]>>;
  user: {
    email: string;
    token: string;
  };
  setUser: React.Dispatch<
    React.SetStateAction<{
      email: string;
      token: string;
    }>
  >;
};

export const MainContext = React.createContext<ContextType>({
  setWalletConnectType: () => {},
  currentWallet: null,
  // setConnector: (connector: Connector) => void;
  // getConnector: () => Connector;
  setWalletConnector: () => {},
  walletConnector: null,
  currentChain: ChainIDs.FANTOMTESTNET,
  setCurrentChain: () => {},
  chainList: [],
  setChainList: () => {},
  user: {
    email: "",
    token: "",
  },
  setUser: () => {},
});

const MainProvider: React.FC<mainProviderInterface> = ({ children }) => {
  const [user, setUser] = useState<{
    email: string;
    token: string;
  }>({
    email: "",
    token: "",
  });

  const [currentWallet, setCurrentWallet] = useState<WalletConnectType>(null);

  const setWalletConnectType = (type: WalletConnectType) =>
    setCurrentWallet(type);

  const [walletConnector, setWalletConnector] = useState<Connector>(null);

  const [currentChain, setCurrentChain] = useState<ChainIDs>(
    ChainIDs.BSCTESTNET
  );

  const [chainList, setChainList] = useState([]);

  return (
    <MainContext.Provider
      value={{
        setWalletConnectType,
        currentWallet,
        walletConnector,
        setWalletConnector,
        currentChain,
        setCurrentChain,
        user,
        setUser,
        chainList,
        setChainList,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

MainProvider.displayName = "Main Provider";

export default MainProvider;

export interface mainProviderInterface {
  children: React.ReactNode;
}
