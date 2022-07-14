import Head from "next/head";
import { useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/router";
import { pageview } from "./../lib/gtm";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import MainProvider from "context/MainProvider";
import { CoinbaseWallet } from "@web3-react/coinbase-wallet";
import {
  useWeb3React,
  Web3ReactHooks,
  Web3ReactProvider,
} from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { Network } from "@web3-react/network";
import type { Connector } from "@web3-react/types";
import { WalletConnect } from "@web3-react/walletconnect";
import {
  coinbaseWallet,
  hooks as coinbaseWalletHooks,
} from "container/Connectors/coinbaseWallet";
import {
  hooks as metaMaskHooks,
  metaMask,
} from "container/Connectors/metaMask";
import { hooks as networkHooks, network } from "container/Connectors/network";
import {
  hooks as walletConnectHooks,
  walletConnect,
} from "container/Connectors/walletConnect";

function getName(connector: Connector) {
  if (connector instanceof MetaMask) return "MetaMask";
  if (connector instanceof WalletConnect) return "WalletConnect";
  if (connector instanceof CoinbaseWallet) return "Coinbase Wallet";
  if (connector instanceof Network) return "Network";
  return "Unknown";
}

const connectors: [
  MetaMask | WalletConnect | CoinbaseWallet | Network,
  Web3ReactHooks
][] = [
  [metaMask, metaMaskHooks],
  [walletConnect, walletConnectHooks],
  [coinbaseWallet, coinbaseWalletHooks],
  [network, networkHooks],
];

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    router.events.on("routeChangeComplete", pageview);
    return () => {
      router.events.off("routeChangeComplete", pageview);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>Token Generator | Oraclez</title>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="It does not matter what type of token you want and what features you need. Oraclez is the best way to enter the professional world of cryptocurrency. The next few minutes can be the beginning of your business success."
        />
        <meta
          name="keywords"
          content="Token Creator, token generator, crypto token generator, erc20 token generator, bep20 token generator, smartcontract, solidity, create a token on bsc, creating a defi token, create my own erc20 token, ethereum, binance smart chain, solana, moonriver, harmoney, celo, heco, erc20, bep20,"
        />

        <link rel="icon" href="/favicon.svg" />
      </Head>

      <Web3ReactProvider connectors={connectors}>
        <MainProvider>
          <Script
            id="gtag-base"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MR3SSC9');
          `,
            }}
          />

           <Script
            id="gtag-base"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              <script async src="https://www.googletagmanager.com/gtag/js?id=G-W6627S9MYE"></script>
              <script>
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-W6627S9MYE');
              </script>
          `,
            }}
          />
          <Component {...pageProps} />
        </MainProvider>
      </Web3ReactProvider>
    </>
  );
}

export default MyApp;
