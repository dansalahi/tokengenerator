import React, {
  useEffect,
  Fragment,
  useContext,
  useState,
  useRef,
  FC,
} from "react";
import { MainContext } from "context/MainProvider";
import { hooks, metaMask } from "../../Connectors/metaMask";
import { Accounts } from "../Accounts";
import { Card } from "../Card";
import { Chain } from "../Chain";
import { CHAINS, getAddChainParameters, URLS } from "../../Chain";
import { ConnectWithSelect } from "../ConnectWithSelect";
import { Status } from "../Status";
import { Network } from "@web3-react/network";
import { MetaMaskIcon } from "@components/icons";
import { useWeb3React } from "@web3-react/core";
import { switchChain } from "utils/switchChain";

const {
  useChainId,
  useAccounts,
  useError,
  useIsActivating,
  useIsActive,
  useProvider,
  useENSNames,
} = hooks;

const MetaMaskCard = () => {
  const { connector } = useWeb3React();
  const isNetwork = connector instanceof Network;

  let eth = useRef<any>(null);

  const {
    walletConnector,
    setWalletConnector,
    setWalletConnectType,
    currentWallet,
    currentChain,
    chainList,
  } = useContext(MainContext);
  // console.log('debug', walletConnector)
  // console.log('meta mask =>', metaMask)
  // console.log('wallet connector', setWalletConnector(metaMask))

  const chainId = useChainId();
  const accounts = useAccounts();
  const error = useError();
  const isActivating = useIsActivating();

  const isActive = useIsActive();

  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  useEffect(() => {
    let { ethereum } = window;
    eth.current = ethereum;
    return () => {};
  }, []);

  // attempt to connect eagerly on mount
  useEffect(() => {
    setWalletConnector(metaMask);
    // void metaMask.connectEagerly();
  }, []);

  useEffect(() => {
    const chainInformation = chainList.find(
      (item) => item.chainId === Number(currentChain)
    );

    console.log("ChainID", chainInformation?.chainId);

    isActive && setWalletConnectType("MetaMask");
    !isActive &&
      currentWallet === "MetaMask" &&
      void metaMask.activate(
        currentChain
          ? getAddChainParameters(chainList, currentChain)
          : undefined
      );

    return () => {};
  }, [isActive]);

  return (
    <div
      className="flex items-center justify-center gap-2"
      onClick={
        !isActive
          ? () => {
              void metaMask.activate();

              currentWallet &&
                switchChain(
                  chainList,
                  provider,
                  connector,
                  currentChain,
                  Number(currentChain)
                );
            }
          : undefined
      }
    >
      {eth ? (
        <>
          {/* <ConnectWithSelect
            connector={metaMask}
            chainId={chainId}
            isActivating={isActivating}
            error={error}
            isActive={isActive}
          /> */}
          <MetaMaskIcon aria-hidden="true" extendClasses="max-h-5" />
          {!isActive ? "MetaMask" : null}
          <Accounts
            accounts={accounts}
            provider={provider}
            ENSNames={ENSNames}
          />
        </>
      ) : (
        <p>Meta Mask isn&apos;t connnected!</p>
      )}
    </div>
  );
};

export default MetaMaskCard;

{
  /* <div>
        <b>MetaMask</b>
        <Status isActivating={isActivating} error={error} isActive={isActive} />
        <div style={{ marginBottom: '1rem' }} />
        <Chain chainId={chainId} />
        <Accounts accounts={accounts} provider={provider} ENSNames={ENSNames} />
      </div>
      <div style={{ marginBottom: '1rem' }} /> */
}
