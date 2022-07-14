/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { Logo } from "@components/ui";

const Documentation: NextPage = () => {
  const [activeSection, setActiveSection] = useState("wallet");

  useEffect(() => {
    const sections = document.querySelectorAll(".document__section");
    console.log(sections);

    window.addEventListener("scroll", () => onScroll(sections));

    return () => window.removeEventListener("scroll", () => onScroll(sections));
  }, []);

  const onScroll = (sections) => {
    [...sections].forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.scrollY + 80 >= sectionTop) {
        setActiveSection(section.getAttribute("id"));
      }
    });
  };

  useEffect(() => {
    const subNavLinks = document.querySelectorAll(".scrollspy-item");
    console.log(subNavLinks);

    [...subNavLinks].forEach((li) => {
      li.classList.remove(
        "font-semibold",
        "text-primary",
        "scrollspy-item--active"
      );
      if (li.id == `${activeSection}-link`) {
        li.classList.add(
          "font-semibold",
          "text-primary",
          "scrollspy-item--active"
        );
      }
    });

    return () => {};
  }, [activeSection]);

  return (
    <div className="grid w-full min-h-screen place-items-center">
      <div className="lg:max-h-screen w-full h-full md:grid-cols-[min-content_1fr] mx-auto text-type-600 text-body-4">
        <header className="fixed top-0 w-full py-3 bg-white border-b shadow-custom-2">
          <div className="relative flex items-center w-11/12 max-w-5xl gap-2 mx-auto">
            <Logo />
            <span className="text-body-2 text-type-600 pt-0.5">
              | Documentation
            </span>
            <Link href="/">
              <button className="ml-auto border rounded py-1.5 px-2 flex items-center gap-1 transition-shadow hover:shadow-sm">
                <span>Home</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </header>
        <div className="flex md:bg-[#fafbfb] min-h-screen mt-14">
          <div className="flex w-11/12 max-w-5xl mx-auto">
            <aside className="fixed bottom-0 z-20 hidden py-10 pr-6 md:flex grow w-96 top-16">
              <ul className="flex flex-col gap-4">
                <li id="wallet-link" className="font-semibold text-gray-700">
                  <Link href="#wallet">
                    <div className="flex items-center gap-2 cursor-pointer">
                      <div className="bg-[#eaeced] p-1 rounded">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="scale-90 bi bi-wallet"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 3a2 2 0 0 1 2-2h13.5a.5.5 0 0 1 0 1H15v2a1 1 0 0 1 1 1v8.5a1.5 1.5 0 0 1-1.5 1.5h-12A2.5 2.5 0 0 1 0 12.5V3zm1 1.732V12.5A1.5 1.5 0 0 0 2.5 14h12a.5.5 0 0 0 .5-.5V5H2a1.99 1.99 0 0 1-1-.268zM1 3a1 1 0 0 0 1 1h12V2H2a1 1 0 0 0-1 1z" />
                        </svg>
                      </div>
                      <span className="nav__link">Wallet</span>
                    </div>
                  </Link>
                  <ul className="flex flex-col gap-4 border-l-2 pl-4 ml-2.5 mt-3 mb-1 text-type-500 text-body-4 font-normal">
                    <li
                      id="whatismetamask-link"
                      className="cursor-pointer scrollspy-item"
                    >
                      <Link href="#whatismetamask">
                        <a>What is MetaMask?</a>
                      </Link>
                    </li>
                    <li
                      id="whatiswalletconnect-link"
                      className="cursor-pointer scrollspy-item"
                    >
                      <Link href="#whatiswalletconnect">
                        <a>What is WalletConnect?</a>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li
                  id="supported-blockchains-link"
                  className="font-semibold text-gray-700"
                >
                  <Link href="#supported-blockchains">
                    <div className="flex items-center gap-2 cursor-pointer">
                      <div className="bg-[#eaeced] p-1 rounded">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="scale-90 bi bi-coin"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z" />
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                          <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                        </svg>
                      </div>
                      <span className="nav__link">Supported Blockchains</span>
                    </div>
                  </Link>
                  <ul className="flex flex-col gap-4 border-l-2 pl-4 ml-2.5 mt-3 mb-1 text-type-500 text-body-4 font-normal">
                    <li id="bsc-link" className="cursor-pointer scrollspy-item">
                      <Link href="#bsc">
                        <a>BSC</a>
                      </Link>
                    </li>
                    <li id="eth-link" className="cursor-pointer scrollspy-item">
                      <Link href="#eth">
                        <a>ETH</a>
                      </Link>
                    </li>
                    <li
                      id="celo-link"
                      className="cursor-pointer scrollspy-item"
                    >
                      <Link href="#celo">
                        <a>CELO</a>
                      </Link>
                    </li>
                    <li
                      id="polygon-link"
                      className="cursor-pointer scrollspy-item"
                    >
                      <Link href="#polygon">
                        <a>Polygon</a>
                      </Link>
                    </li>
                    <li id="ftm-link" className="cursor-pointer scrollspy-item">
                      <Link href="#ftm">
                        <a>FTM</a>
                      </Link>
                    </li>
                    <li
                      id="harmony-link"
                      className="cursor-pointer scrollspy-item"
                    >
                      <Link href="#harmony">
                        <a>Harmony</a>
                      </Link>
                    </li>
                    <li
                      id="heco-link"
                      className="cursor-pointer scrollspy-item"
                    >
                      <Link href="#heco">
                        <a>Heco</a>
                      </Link>
                    </li>
                    <li
                      id="iotex-link"
                      className="cursor-pointer scrollspy-item"
                    >
                      <Link href="#iotex">
                        <a>IOTEX</a>
                      </Link>
                    </li>
                    <li
                      id="moonriver-link"
                      className="cursor-pointer scrollspy-item"
                    >
                      <Link href="#moonriver">
                        <a>Moonriver</a>
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </aside>
            <main className="flex flex-col gap-4 py-8 bg-white documentation__main md:p-12 md:ml-48">
              <div
                id="wallet"
                className="flex flex-col gap-4 document__section"
              >
                <h3 className="font-semibold text-zinc-800 text-heading-3">
                  Wallet
                </h3>
                <h4
                  className="font-semibold text-zinc-800 text-heading-4 document__section"
                  id="whatismetamask"
                >
                  What is MetaMask?
                </h4>
                <p className="leading-5 text-type-500">
                  ConsenSys Software Inc. developed MetaMask to provide an
                  easily accessible bridge between our current internet — web
                  2.0, and the decentralized internet — web 3.0.
                  <br />
                  <br />
                  In other words, it's a software toolbox for interacting with
                  decentralized applications (DApps), smart contracts, and Defi
                  using a web browser like Chrome or Firefox. You can use
                  MetaMask as both a browser extension and a mobile app.
                  <br />
                  <br />
                  MetaMask works as an Ethereum wallet for buying, storing, and
                  swapping your ETH and ERC-20 tokens. You can also store and
                  display your non-fungible tokens (NFTs) in your wallet.
                  <br />
                  <br />
                  Other cryptocurrency wallets require you to manage your
                  various private keys manually. But with MetaMask, you need
                  only remember your password and seed phrase to use your
                  cryptocurrency.
                  <br />
                  <br />
                  Even if you store your tokens on a hardware wallet like Ledger
                  or Trezor, you can still use MetaMask to interact with DApps
                  and smart contracts.
                  <br />
                  <br />
                  Due to its ease of use and accessibility, MetaMask is
                  incredibly popular. The platform currently boasts more than 3
                  million active users per month.
                  <br />
                  <br />
                  The MetaMask wallet connects to the Ethereum network by
                  default, but you can easily link it to other blockchains to
                  access other DApps — a process we walk you through later in
                  this guide.
                </p>
                <br />
                <h5 className="font-semibold text-zinc-800 text-body-3">
                  How to Download MetaMask?
                </h5>
                <p>
                  MetaMask is available as both a browser extension and as a
                  mobile app. There is currently no desktop app available.
                  <br />
                  <br />
                  The browser extension is available on Chrome, Firefox, Brave,
                  or Edge. The mobile app is available through the Apple App
                  Store and the Google Store. The mobile apps have all the
                  functionality and features of the browser extension, including
                  account creation.
                  <br />
                  <br />
                  To download the browser extension, head to the MetaMask
                  website and click on the "Install MetaMask for (your
                  browser)."
                  <br />
                  <br />
                  Once the download finishes, MetaMask prompts you to create or
                  import a wallet. If you choose to make a wallet, you will need
                  to select a unique password, after which you will receive a
                  seed phrase of twelve words.
                  <br />
                  <br />
                  Don't forget to write down your seed phrase and store it
                  securely — without it, you can't recover your funds if you
                  lose access to your account.
                </p>
                <br />
                <h5 className="font-semibold text-zinc-800 text-body-3">
                  How to Interact with Dapps and Smart Contracts Using MetaMask
                </h5>
                <p>
                  Once you have set up your MetaMask wallet, you can start
                  exploring and interacting with DApps. Most DApps will connect
                  to your wallet as soon as you arrive on the page, but others
                  require a manual connection.
                  <br />
                  <br />
                  If MetaMask doesn't connect automatically, log into the DApp,
                  navigate to the settings, and look for a button saying, "Link
                  your wallet", or something similar. All that's required is to
                  click the button, follow the instructions, and away you go.
                  <br />
                  <br />
                  If you're unfamiliar with oraclez token generator, you don't
                  need to add your chosen blockchain into your wallet manually.
                  all you have to do is select your blockchain, connect your
                  metamask and press the approve button on your Metamask wallet.
                  oraclez will add that blockchain into your meta mask wallet
                  automatically.
                </p>
                <br />
                <h4
                  className="font-semibold text-zinc-800 text-heading-4 document__section"
                  id="whatiswalletconnect"
                >
                  What is Wallet Connect?
                </h4>
                <p className="leading-5 text-type-500">
                  WalletConnect is an open protocol to communicate securely
                  between Wallets and Dapps (Web3 Apps). The protocol
                  establishes a remote connection between two apps and/or
                  devices using a Bridge server to relay payloads. These
                  payloads are symmetrically encrypted through a shared key
                  between the two peers. The connection is initiated by one peer
                  displaying a QR Code or deep link with a standard
                  WalletConnect URI and is established when the counter-party
                  approves this connection request. It also includes an optional
                  Push server to allow Native applications to notify the user of
                  incoming payloads for established connections.
                </p>
              </div>
              <hr />
              <div
                id="supported-blockchains"
                className="flex flex-col gap-4 document__section"
              >
                <h3 className="font-semibold text-zinc-800 text-heading-3">
                  Supported Blockchains
                </h3>
                {/* BSC */}
                <h4
                  className="font-semibold text-zinc-800 text-heading-4 document__section"
                  id="bsc"
                >
                  BSC
                </h4>
                <h5 className="font-semibold text-zinc-800 text-body-3">
                  What is Binance Smart Chain?
                </h5>
                <p className="leading-5 text-type-500">
                  You’ve probably heard of Binance Chain, the home of the BNB
                  currency. It’s optimized for ultra-fast trading. To achieve
                  this, it had to make certain trade-offs – one being that it
                  wasn’t as flexible from a programmability standpoint as other
                  blockchains.
                  <br />
                  <br />
                  Well, Binance Smart Chain is here to change that, a new
                  blockchain with a full-fledged environment for developing
                  high-performance decentralized applications. It was built for
                  cross-chain compatibility with Binance Chain to ensure that
                  users get the best of both worlds.
                  <br />
                  <br />
                  Binance Smart Chain (BSC) is best described as a blockchain
                  that runs in parallel to the Binance Chain. Unlike Binance
                  Chain, BSC boasts smart contract functionality and
                  compatibility with the Ethereum Virtual Machine (EVM). The
                  design goal here was to leave the high throughput of Binance
                  Chain intact while introducing smart contracts into its
                  ecosystem.
                  <br />
                  <br />
                  In essence, both blockchains operate side-by-side. It’s worth
                  noting that BSC isn’t a so-called layer two or off-chain
                  scalability solution. It’s an independent blockchain that
                  could run even if Binance Chain went offline. That said, both
                  chains bear a strong resemblance from a design standpoint.
                  <br />
                  <br />
                  Because BSC is EVM-compatible, it launched with support for
                  the rich universe of Ethereum tools and DApps. In theory, this
                  makes it easy for developers to port their projects over from
                  Ethereum. For users, it means that applications like MetaMask
                  can be easily configured to work with BSC.
                </p>
                <br />
                {/* ETH */}
                <h4
                  className="font-semibold text-zinc-800 text-heading-4 document__section"
                  id="eth"
                >
                  ETH
                </h4>
                <h5 className="font-semibold text-zinc-800 text-body-3">
                  What is an Ethereum token?
                </h5>
                <p className="leading-5 text-type-500">
                  Ethereum tokens are simply digital assets that are being built
                  on top of the Ethereum blockchain. They benefit from
                  Ethereum’s existing infrastructure instead of developers
                  having to build an entirely new blockchain. They also
                  strengthen the Ethereum ecosystem by driving demand for ether,
                  the native currency of Ethereum, needed to power the smart
                  contracts. This beginner’s guide should help those who are new
                  to digital assets to understand Ethereum tokens at a high
                  level and how they are different than Ethereum.
                  <br />
                  <br />
                  Ethereum is a platform that can be used to create any
                  arbitrary smart contract including smart contracts that
                  represent digital assets called Ethereum tokens. This is
                  similar to the App Store providing a platform for iOS apps
                  with some apps issuing their own digital currencies that are
                  used within the game or system. However, with Ethereum there
                  is no centralized entity like Apple that controls what gets
                  added to the App Store. Anyone can create a token on top of
                  Ethereum.
                  <br />
                  <br />
                  Ethereum tokens can represent anything from a physical object
                  like gold to a native currency used to pay transaction fees.
                  In the future, tokens may even be used to represent financial
                  instruments like stocks and bonds. The properties and
                  functions of each token are entirely subject to its intended
                  use. Tokens can have a fixed supply, constant inflation rate,
                  or even a supply determined by a sophisticated monetary
                  policy. Tokens can be used for a variety of purposes such as
                  paying to access a network or for decentralized governance
                  over an organization.
                  <br />
                  <br />
                  Tokens are often issued to the public through a crowd sale
                  called an initial coin offering (ICO). The creators of the
                  token will issue the token to others in exchange for ether and
                  sometimes bitcoin and other digital currencies. There have
                  been many ICOs recently and in a short time they have
                  completely changed the way projects are funded. There is no
                  requirement that tokens must be well distributed, although if
                  you are building a decentralized application ideally you want
                  the tokens to be owned by as many people as possible.
                </p>
                <br />
                {/* CELO */}
                <h4
                  className="font-semibold text-zinc-800 text-heading-4 document__section"
                  id="celo"
                >
                  CELO
                </h4>
                <h5 className="font-semibold text-zinc-800 text-body-3">
                  What is Celo? (CELO)
                </h5>
                <p className="leading-5 text-type-500">
                  Celo is a platform acting as a global payment infrastructure
                  for cryptocurrencies that aims to target mobile users.
                  <br />
                  <br />
                  To this end, Celo’s goal is for financial activity to be
                  accessible to anyone globally thanks to its ability for
                  payments to be sent to and from any phone number in the world.
                  <br />
                  <br />
                  In addition to basic payments, Celo can support the
                  development of decentralized applications on its blockchain.
                  Thus far, these dapps include one allowing anyone to
                  contribute to a community’s universal basic income scheme, as
                  well as a crowdfunding platform for social causes.
                  <br />
                  <br />
                  Central to running the operations on its blockchain, Celo
                  operates two native tokens: CELO, a governance asset for
                  voting on changes to the protocol and Celo Dollars (cUSD), a
                  stablecoin mirroring the value of the US dollar.
                  <br />
                  <br />
                  The Celo network relies on three contributors to help run its
                  platform:
                </p>
                <br />
                <h5 className="font-semibold text-zinc-800 text-body-4">
                  Light Clients:
                </h5>
                <p>
                  Celo Network applications running on user’s mobile devices,
                  such as Celo’s mobile wallet.
                </p>
                <br />
                <h5 className="font-semibold text-zinc-800 text-body-4">
                  Validator Nodes:
                </h5>

                <p>
                  Computers who participate in Celo’s consensus mechanism,
                  validate transactions and produce new blocks.
                </p>
                <br />
                <h5 className="font-semibold text-zinc-800 text-body-4">
                  Full Nodes:
                </h5>
                <p>
                  Computers that act as the bridge between Validator nodes and
                  mobile wallets, taking requests from light clients and
                  forwarding transactions to validator nodes.
                </p>
                <br />
                {/* Polygon */}
                <h4
                  className="font-semibold text-zinc-800 text-heading-4 document__section"
                  id="polygon"
                >
                  Polygon
                </h4>
                <h5 className="font-semibold text-zinc-800 text-body-3">
                  What is Polygon?
                </h5>
                <p className="leading-5 text-type-500">
                  Polygon is a stack of protocols designed to fix Ethereum’s
                  scalability issues. The Polygon network addresses the
                  network’s challenges by handling transactions on a separate
                  Ethereum-compatible blockchain.
                  <br />
                  <br />
                  Polygon then returns transactions to the main Ethereum
                  blockchain post-processing. This approach lowers the network
                  load on Ethereum. In doing so, Polygon can speed up
                  transactions and lower transaction costs to less than a cent.
                  <br />
                  <br />
                  In other words, Polygon, formerly known as Matic network,
                  provides an easy framework for new and existing blockchain
                  projects to build on Ethereum without scalability issues.
                  <br />
                  <br />
                  Using Polygon, users can interact with any decentralized
                  application (DApp) without ever having to worry about network
                  congestion.
                </p>
                <br />
                {/* FTM */}
                <h4
                  className="font-semibold text-zinc-800 text-heading-4 document__section"
                  id="ftm"
                >
                  FTM
                </h4>
                <h5 className="font-semibold text-zinc-800 text-body-3">
                  What is Fantom (FTM)?
                </h5>
                <p className="leading-5 text-type-500">
                  Fantom is a DAG-based (Directed Acyclic Graph) smart contract
                  platform for decentralized applications (DApps). So, is Fantom
                  centralized or decentralized?
                  <br />
                  <br />
                  Fantom is a highly scalable, decentralized, permissionless and
                  open-source platform used to build crypto DApps. DAG is a data
                  modeling and structuring technology whose networks comprise
                  vertices and edges, unlike blockchains, which are made up of
                  blocks. As a result, crypto transactions are represented by
                  vertices and are stacked on top of one another.
                  <br />
                  <br />
                  Simply said, a blockchain system resembles a chain whereas
                  DAG's design resembles a graph. Dr. Ahn Byung Ik of South
                  Korea founded the Fantom Foundation in 2018, and the smart
                  contract project has since grown to become one of the most
                  popular blockchains for DeFi transactions.
                  <br />
                  <br />
                  It was created to address the shortcomings, including the
                  lengthy transaction times of prior blockchain platforms like
                  Bitcoin and Ethereum. FTM is the Fantom network's native coin,
                  which can be used for governance activities, compensating
                  validators and providing network security.
                  <br />
                  <br />
                  This beginner's guide on Fantom blockchain protocol aims to
                  educate the community about the Fantom ecosystem by explaining
                  how the Fantom Network works, how to buy Fantom (FTM) and the
                  differences between FTM and Polygon (MATIC).
                </p>
                <br />
                <h5 className="font-semibold text-zinc-800 text-body-4">
                  What is so unique about Fantom?
                </h5>
                <p>
                  Traditional blockchain systems, such as the Bitcoin
                  blockchain, aren't designed for scalability; rather, they
                  prioritize security and decentralization. A transaction on the
                  Bitcoin network, for example, can take anywhere from 10 to 15
                  minutes. This makes scaling the network in terms of
                  transactions difficult.
                </p>
                <br />
                {/* Harmony */}
                <h4
                  className="font-semibold text-zinc-800 text-heading-4 document__section"
                  id="harmony"
                >
                  Harmony
                </h4>
                <h5 className="font-semibold text-zinc-800 text-body-3">
                  What is the Harmony blockchain?
                </h5>
                <p className="leading-5 text-type-500">
                  Harmony is a layer-1 blockchain using sharding and Effective
                  Proof of Stake to achieve scalability, security, and
                  decentralization. The network was launched in 2019 and
                  features trustless cross-chain bridges and four shards, which
                  process transactions in parallel. Effective Proof of Stake
                  encourages decentralization of validators, and sharding shares
                  the network's load among validators, delegators, and users.
                  <br />
                  <br />
                  Its native token ONE is used for transaction fees, governance,
                  and staking. You can purchase ONE on Binance with a credit or
                  debit card or trade it for another cryptocurrency. Once
                  purchased, you can store ONE on EVM-compatible wallets like
                  MetaMask and Binance Chain Wallet.
                  <br />
                  <br />
                  Harmony is an Effective Proof of Stake (EPoS) blockchain
                  founded in 2018 by Stephen Tse with a mainnet launch in 2019.
                  Like most post-Ethereum networks, it claims to solve the
                  blockchain trilemma of decentralization, scalability, and
                  security. Harmony's answer to the problem is sharding and its
                  Effective Proof of Stake consensus mechanism.
                  <br />
                  <br />
                  Another key Harmony platform feature is its Cross-Chain
                  Finance model. The popularity of cross-chain and multi-chain
                  capabilities has increased dramatically, and Harmony caters to
                  this. The blockchain offers bridging services between BNB
                  Smart Chain (BNB), Ethereum (ETH), Bitcoin (BTC), and other
                  networks.
                  <br />
                  <br />
                  Harmony completed its 2019 IEO via Binance Launchpad.
                  Harmony's main vision for scaling Web3 relies on
                  zero-knowledge proofs and Decentralized Autonomous
                  Organizations (DAOs).
                </p>
                <br />
                {/* Heco */}
                <h4
                  className="font-semibold text-zinc-800 text-heading-4 document__section"
                  id="heco"
                >
                  Heco
                </h4>
                <h5 className="font-semibold text-zinc-800 text-body-3">
                  What Is Huobi ECO Chain (HECO)?
                </h5>
                <p className="leading-5 text-type-500">
                  Huobi Eco Chain (Heco) is a decentralized and cost-efficient
                  public chain that Ethereum developers can easily get started
                  with and smart contracts are seamlessly compatible.” Heco has
                  built a developed Defi ecosystem, with wallets, assets, and
                  applications rankings. Users can easily experience the latest
                  DApps.
                  <br />
                  <br />
                  Heco was developed based on Ethereum but improves cross-chain
                  functionality as well as low gas fees. It helps reduce costs
                  and optimizes user experience with the cross-chain asset
                  transfer.
                  <br />
                  <br />
                  For users, they can enjoy low transaction fees, low
                  transaction delay, high transaction concurrency, and
                  cross-chain asset transfers. For developers, they can develop
                  smart contracts with high compatibility with Ethereum and
                  other public blockchains to reduce development and migration
                  costs. Heco provides financial, traffic, and marketing support
                  for developers so they can focus on making the best DeFi
                  applications without worries.
                  <br />
                  <br />
                  Heco has laid out its roadmap until 2023 Q1. Currently, it is
                  in the first stage called “Tinder” which focuses on improving
                  the on-chain infrastructure, as the developers say in their
                  official docs. Its main focus is to attract developers to
                  develop and promote DeFi applications at a low cost.
                </p>
                <br />
                {/* IOTEX */}
                <h4
                  className="font-semibold text-zinc-800 text-heading-4 document__section"
                  id="iotex"
                >
                  IOTEX
                </h4>
                <h5 className="font-semibold text-zinc-800 text-body-3">
                  What is IoTeX?
                </h5>
                <p className="leading-5 text-type-500">
                  A decentralized, open-sourced blockchain platform with a
                  vision to mix cryptocurrency technology with the Internet of
                  Things (hence the IoT in IoTeX) - the goal is to create a
                  decentralized ecosystem where users and their IoT machines are
                  able to interact in safe, guaranteed trustless environments.
                  <br />
                  <br />
                  The IoTeX blockchain adopts a modified delegation of the Proof
                  of Stake consensus (PoS), for a lighter and faster
                  transactional state as mentioned previously. It also innovates
                  by holding several lateral blockchains to improve scalability.
                  Since the Internet of Things technology involves a large
                  variety of apps, software and hardware, a single blockchain
                  would not be nearly enough computing power to hold all the
                  necessary processing and transactions.
                  <br />
                  <br />
                  The IOTX token is the blockchain’s native ERC-20 token used to
                  feed the dApps, govern the network and of course as a payment
                  system. Users utilize IOTX to register their devices in the
                  blockchain and conduct transactions, and are even able to
                  share or sell their own data and receive IOTX tokens as a
                  reward.
                  <br />
                  <br />
                  Cryptocurrencies have several real-world applications - mostly
                  geared towards financial transactions, the world of digital
                  assets also allows for incredible innovation in real-life
                  devices and data usage that could greatly benefit from
                  decentralization and trustless systems to make users’ lives
                  easier and safer.
                  <br />
                  <br />
                  One of the main crypto projects that tackles this matter is
                  IoTeX, focused on developing applications for the Internet of
                  Things.
                </p>
                <br />
                {/* Moonriver */}
                <h4
                  className="font-semibold text-zinc-800 text-heading-4 document__section"
                  id="moonriver"
                >
                  Moonriver
                </h4>
                <h5 className="font-semibold text-zinc-800 text-body-3">
                  What Is Moonriver?
                </h5>
                <p className="leading-5 text-type-500">
                  Moonriver is a parachain on the Kusama network for crypto
                  projects to expand their reach with a multi-chain design. The
                  Moonriver parachain is compatible with the Ethereum developer
                  network and toolchain.
                  <br />
                  <br />
                  Moonriver was developed by the Moonbeam Foundation, and
                  PureStake is the entity behind the Moonbeam Foundation. A
                  parachain on the Kusama network is a customized blockchain
                  that connects to the Relay Chain, which handles transaction
                  settlements, consensus and security. Since the parachain is
                  connected, it shares the benefits afforded by Kusama through
                  the Relay Chain.Moonriver has a crypto token, MOVR, which it
                  distributes for several purposes. The Moonriver parachain
                  functions as a smart contract platform, providing developers
                  less friction for redeploying Ethereum decentralized apps
                  without reconfiguring or rewriting for Karura. The Moonbeam
                  Foundation also created a platform that it launched on the
                  Polkadot system in 2021, which is similar to Kusama.
                  Collectively, the two chains are referred to as “DotSama.” The
                  Moonriver parachain is a canary network for Moonbeam.
                  Developers can test code and perform verification on Moonriver
                  before they deploy it on Moonbeam.
                  <br />
                  <br />
                  The network offers developers features, including deploying
                  Solidity smart contracts, Web3-compatible API, oracle data
                  feeds, and Ethereum network bridges. MOVR is the utility and
                  governance token of the network, which can be used for network
                  governance, pay transaction fees, earning rewards through
                  providing liquidity and staking.
                  <br />
                  <br />
                  MOVR is the utility and governance token of Moonriver
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
