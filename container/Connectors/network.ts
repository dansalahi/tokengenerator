import { initializeConnector } from "@web3-react/core";
import { Network } from "@web3-react/network";
import { URLS } from "../Chain";

export const [network, hooks] = initializeConnector<Network>(
  (actions) => new Network(actions, URLS),
  Object.keys(URLS).map((chainId) => Number(chainId))
);

// @web3-react/core
// sendTransaction(signedTransaction: string | Promise<string>): Promise<TransactionResponse>
