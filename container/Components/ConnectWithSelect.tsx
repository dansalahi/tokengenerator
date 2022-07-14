import { useContext } from "react";
import type { CoinbaseWallet } from "@web3-react/coinbase-wallet";
import type { Web3ReactHooks } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { Network } from "@web3-react/network";
import { WalletConnect } from "@web3-react/walletconnect";
import { walletConnect } from "../Connectors/walletConnect";
import { metaMask } from "../Connectors/metaMask";
import { useCallback, useState } from "react";
import { CHAINS, getAddChainParameters, URLS } from "../Chain";
import { MainContext } from "context/MainProvider";

export function ConnectWithSelect({
  connector,
  chainId,
  isActivating,
  error,
  isActive,
}: {
  connector: MetaMask | WalletConnect | CoinbaseWallet | Network;
  chainId: ReturnType<Web3ReactHooks["useChainId"]>;
  isActivating: ReturnType<Web3ReactHooks["useIsActivating"]>;
  error: ReturnType<Web3ReactHooks["useError"]>;
  isActive: ReturnType<Web3ReactHooks["useIsActive"]>;
}) {
  if (error) {
    console.log("ConnectWithSelect ERROR:", error);
  }

  const { setWalletConnectType, currentWallet, currentChain, chainList } =
    useContext(MainContext);

  const isNetwork = connector instanceof Network;
  const displayDefault = false; //!isNetwork
  const chainIds = (isNetwork ? Object.keys(URLS) : Object.keys(CHAINS)).map(
    (chainId) => Number(chainId)
  );

  if (error) {
    return (
      <div className="d-flex flex-row justify-content-center align-items-center">
        <button
          className="btn w-auto"
          onClick={() => {
            connector instanceof WalletConnect || connector instanceof Network
              ? void connector.activate(currentChain ? currentChain : undefined)
              : void connector.activate(
                  currentChain
                    ? getAddChainParameters(chainList, currentChain)
                    : undefined
                );
          }}
        >
          Try again
        </button>
      </div>
    );
  } else {
    return (
      <div className="d-flex flex-row justify-content-center align-items-center">
        <button
          className="btn btn-primary btn-sm flex justify-center items-center gap-2"
          onClick={
            isActivating
              ? undefined
              : () => {
                  connector instanceof WalletConnect ||
                  connector instanceof Network
                    ? connector.activate(
                        currentChain ? currentChain : undefined
                      )
                    : connector.activate(
                        currentChain
                          ? getAddChainParameters(chainList, currentChain)
                          : undefined
                      );
                }
          }
          disabled={isActivating}
        >
          {connector === metaMask
            ? "MetaMask"
            : connector === walletConnect
            ? "WalletConnect"
            : ""}
        </button>
      </div>
    );
  }
}
