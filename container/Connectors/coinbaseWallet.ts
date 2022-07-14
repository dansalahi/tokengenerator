import { CoinbaseWallet } from "@web3-react/coinbase-wallet";
import { initializeConnector } from "@web3-react/core";
import { URLS } from "../Chain";

const firstNetworkItem = Object.keys(URLS)[0];

export const [coinbaseWallet, hooks] = initializeConnector<CoinbaseWallet>(
  (actions) =>
    new CoinbaseWallet(actions, {
      url: URLS[firstNetworkItem as any][0],
      appName: "web3-react",
    })
);
