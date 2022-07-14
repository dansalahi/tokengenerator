import React, { useEffect, useContext, useRef, useState, FC } from "react";
import { MainContext } from "context/MainProvider";
import { hooks, walletConnect } from "../../Connectors/walletConnect";
import { Accounts } from "../Accounts";
import { Card } from "../Card";
import { Chain } from "../Chain";
import { ConnectWithSelect } from "../ConnectWithSelect";
import { Status } from "../Status";
import { WalletConnectIcon } from "@components/icons";
import { Network } from "@web3-react/network";
import { useWeb3React } from "@web3-react/core";

const {
  useChainId,
  useAccounts,
  useError,
  useIsActivating,
  useIsActive,
  useProvider,
  useENSNames,
} = hooks;

const WalletConnectCard = () => {
  const { connector } = useWeb3React();
  const isNetwork = connector instanceof Network;

  let eth = useRef<any>(null);

  const {
    setWalletConnector,
    setWalletConnectType,
    currentWallet,
    currentChain,
  } = useContext(MainContext);

  const chainId = useChainId();
  const accounts = useAccounts();
  const error = useError();
  const isActivating = useIsActivating();

  const isActive = useIsActive();

  const provider = useProvider();
  // console.log("provider", provider);
  const ENSNames = useENSNames(provider);

  useEffect(() => {
    let { ethereum } = window;
    eth.current = ethereum;
    return () => {};
  }, []);

  // attempt to connect eagerly on mount
  useEffect(() => {
    setWalletConnector(walletConnect);
    // void walletConnect.connectEagerly();
  }, []);

  useEffect(() => {
    isActive && setWalletConnectType("WalletConnect");
    !isActive &&
      currentWallet === "WalletConnect" &&
      walletConnect.activate(currentChain ? currentChain : undefined);

    return () => {};
  }, [isActive]);

  return (
    <div
      className="flex items-center justify-center gap-0"
      onClick={
        !isActive
          ? () => {
              walletConnect.activate(currentChain ? currentChain : undefined);
            }
          : undefined
      }
    >
      <WalletConnectIcon aria-hidden="true" />
      {!isActive ? "WalletConnect" : null}
      <Accounts accounts={accounts} provider={provider} ENSNames={ENSNames} />
    </div>
  );
};

export default WalletConnectCard;
