import React, { useState, useEffect, useRef, useContext } from "react";
import type { NextPage } from "next";
import { toHex, toWei , toBN} from "web3-utils";
import axios from "axios";
import { Socket, io } from "socket.io-client";
import { Logo, Grid, Container, Dropdown, Button } from "@components/ui";
import { MenuIcon, GreenGuardIcon, TickSquareIcon } from "@components/icons";
import FormInput from "@components/ui/Form/FormInput";
import Form from "@components/ui/Form/Form";
import FormCheckBox from "@components/ui/Form/FormCheckBox";
import FormGroup from "@components/ui/Form/FormGroup";
import { NETWORKS_DATA } from "constants/networksData";
import CodeBox from "@components/ui/CodeBox";
import Modal from "@components/ui/Modal";
import NetworksModal from "@components/ui/NetworksModal";
import MeterSpinner from "@components/ui/Spinner/MeterSpinner";
import { metaMask } from "../container/Connectors/metaMask";
import { walletConnect } from "../container/Connectors/walletConnect";
import { CHECKBOXES_MESSAGE } from "constants/codeTexts";
import { TOOLTIPS_MESSAGE } from "constants/tooltipsMessage";
import { FormikProvider, useFormik } from "formik";
import apiObj from "configs/api.json";
import { network } from "container/Connectors/network";
import { MainContext } from "context/MainProvider";
import Typewriter from "typewriter-effect";
import FileSaver from "file-saver";
import WalletConnectComponent from "container/WalletConnect";
import {
  useWeb3React,
  Web3ReactHooks,
  Web3ReactProvider,
} from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { WalletConnect } from "@web3-react/walletconnect";
import { Network } from "@web3-react/network";
import { CHAINS, getAddChainParameters, URLS } from "container/Chain";
import { switchChain } from "utils/switchChain";
import { disconnect } from "process";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BaseUrl = apiObj["BaseUrl"];

declare let window: any;

const Create: NextPage = () => {
  const [isTokenDeployed, setIsTokenDeployed] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isNetworkModalOpen, setIsNetworkModalOpen] = useState<boolean>(false);
  const [activeNetwork, setActiveNetwork] = useState<ISupportedNetwork>(null);
  const [selectedNetwork, setSelectedNetwork] =
    useState<networkInterface>(null);
  const [error, setError] = useState<{ text: string; type: string } | null>({
    text: "",
    type: "",
  });
  const [socket, setSocket] = useState<Socket | null>(null);
  const [socketError, setSocketError] = useState<boolean>(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [tokenData, setTokenData] = useState({
    paymentHash: "",
    deployedToken: "",
  });
  const [supportedNetworks, setSupportedNetworks] = useState<
    ISupportedNetwork[]
  >([]);
  const [transactionError, setTransactionError] = useState<boolean>(false);
  // const [transactionNetwork, setTransactionNetwork] = useState<string>("");

  const [progressData, setProgressData] = useState({
    step: 0,
    value: "",
  });

  const {
    currentWallet,
    walletConnector,
    setCurrentChain,
    currentChain,
    setWalletConnectType,
    chainList,
    setChainList,
  } = useContext(MainContext);

  const toggleModalState = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleNetworkModal = () => {
    if (!isTokenDeployed) {
      setTransactionError(false);
      setIsNetworkModalOpen(!isNetworkModalOpen);
    } else {
      notAllowedToggleNetworkNotify();
    }
  };

  const submitHandler = (data) => {
    setProgressData({
      step: 0,
      value: "",
    });
    socket.emit("create-token", data);
  };

  const formik = useFormik({
    initialValues: {
      symbol: "",
      name: "",
      decimals: "",
      premint: "",
      checkboxes: {
        mintable: false,
        burnable: false,
        pausable: false,
        permit: false,
        votes: false,
        flashminting: false,
        snapshots: false,
      },
      license: "MIT",
      formCheckboxes: [],
    },
    onSubmit: () => handleSubmit(),
  });

  useEffect(() => {
    axios
      .get(`https://chainid.network/chains.json`)
      .then(function (res: any) {
        setChainList(res.data);
      })
      .catch(function (err: any) {});

    axios
      .get(`${BaseUrl}/create-tokens/supportedNetworks`)
      .then(function (res: any) {
        setSupportedNetworks(res.data);
      })
      .catch(function (err: any) {});
  }, []);

  const changeSelectedNetwork = (
    networkId: number,
    networkKey: string,
    networkProtocol: string,
    networkImg: string
  ) => {
    setSelectedNetwork({
      id: networkId,
      key: networkKey,
      protocol: networkProtocol,
      img: networkImg,
    });
    localStorage.removeItem("payment-hash");
    localStorage.removeItem("network");
    localStorage.removeItem("user-wallet-connect");
    toggleNetworkModal();
    setTransactionError(false);
  };

  const getHash = (value: number, destAddress: string) => {
    return new Promise<string>(async (resolve, reject) => {
      let accounts;

      accounts = await provider.request({
        method: "eth_requestAccounts",
      });

      let _value = toHex(value); //TODO: "ether" means 10 ** 18
      provider
        .request({
          method: "eth_sendTransaction",
          params: [
            {
              from: accounts[0],
              to: destAddress,
              value: _value,
              // gasPrice: '0x09184e72a000',
              // gas: '0x2710',
            },
          ],
        })
        .then((txHash: string) => {
          // console.log("txHash: ", txHash);
          // generatedHash = txHash
          // setHash(txHash)
          // resolve(txHash)
          setTimeout(() => resolve(txHash), 5000);
        })
        .catch((error: any) => {
          if (error.code === 4001) {
            reject(4001);
          } else if (error.code === -32000) {
            setError({
              text: `User rejected the transaction`,
              type: "danger",
            });
          }
          setTransactionError(true);
          toggleModalState();
          setIsModalOpen(false);
          console.log("error: ", error);
        });
    });
  };

  useEffect(() => {
    setSocket(
      io(apiObj.SocketUrl, {
        // transportOptions: {
        //     polling: {
        //         extraHeaders: {
        //             authorization: obj.idToken, //JWT Token
        //         },
        //     },
        // },
      })
    );
  }, []);

  const networkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      setSocketConnected(socket.connected);
    });

    socket.on("disconnect", () => {
      setSocketConnected(socket.connected);
    });

    socket.on("create-token-progress", (data: any) => {
      setProgressData(data);
      console.log(data);
    });

    socket.on("create-token-result", (data: any) => {
      console.log('create-token-result: ', data)
      if (data.status === "done") {
        // setTransactionNetwork(activeNetwork.key);
        setIsTokenDeployed(true);
        if (networkRef && networkRef.current){
          const networkName = CHAINS[localStorage.getItem("network")]?.name
          networkRef.current.innerText =  networkName;
        }
        setIsModalOpen(false);
        setTokenData(data);
        localStorage.removeItem("payment-hash");
        localStorage.removeItem("user-wallet-connect");
        setTransactionError(false);
      }
      if (data.status === "error") {
        setSocketError(true);
        setError({
          text: `Error in your deployed token, Please try again.\n${data.deployOutput}`,
          type: "danger",
        });
        setTransactionError(true);
      }

      setIsModalOpen(false);
    });
  }, [socket]);

  useEffect(() => {
    const checkBoxesList: {
      mintable: boolean;
      burnable: boolean;
      pausable: boolean;
      permit: boolean;
      votes: boolean;
      flashminting: boolean;
      snapshots: boolean;
    } = {
      mintable: false,
      burnable: false,
      pausable: false,
      permit: false,
      votes: false,
      flashminting: false,
      snapshots: false,
    };

    let i = 0;
    for (const checkboxItem in checkBoxesList) {
      if (checkBoxesList[formik.values.formCheckboxes[i]] === false) {
        checkBoxesList[formik.values.formCheckboxes[i]] = true;
      }
      i++;
    }

    setCheckboxState(checkBoxesList);

    return () => {};
  }, [formik.values]);

  const { connector } = useWeb3React();
  const { provider } = connector;

  const submitCreateTokenTransaction = (hash: string) => {
    const { symbol, name, decimals, premint, license } = formik.values;

    const checkBoxesList: {
      mintable: boolean;
      burnable: boolean;
      pausable: boolean;
      permit: boolean;
      votes: boolean;
      flashminting: boolean;
      snapshots: boolean;
    } = {
      mintable: false,
      burnable: false,
      pausable: false,
      permit: false,
      votes: false,
      flashminting: false,
      snapshots: false,
    };

    const {
      mintable,
      burnable,
      pausable,
      permit,
      votes,
      flashminting,
      snapshots,
    } = checkBoxesList;

    const data = {
      network: activeNetwork?.key,
      symbol: symbol,
      name: name,
      decimals: decimals,
      paymentHash: hash,
      createParams: {
        mintable: mintable,
        burnable: burnable,
        pausable: pausable,
        permit: permit,
        votable: votes,
        flashMinting: flashminting,
        snapshots: snapshots,
        license: license,
        premint: premint,
      },
    };

    if (!hash) {
      setError({
        text: "Something went wrong. Please try again later.",
        type: "danger",
      });
      return;
    }

    localStorage.setItem("payment-hash", JSON.stringify(hash));
    localStorage.setItem("network", JSON.stringify(currentChain));
    submitHandler(data);
  };

  const inputsStateObj = {
    symbol: null,
    name: null,
    decimals: null,
    premint: null,
  };

  const [inputsState, setInputsState] = useState(inputsStateObj);

  const [checkboxState, setCheckboxState] = useState({
    mintable: false,
    burnable: false,
    pausable: false,
    permit: false,
    votes: false,
    flashminting: false,
    snapshots: false,
  });

  const clearFormInputs = () => {
    formik.values.symbol = "";
    formik.values.name = "";
    formik.values.decimals = "";
    formik.values.premint = "";
    formik.values.premint = "";
    formik.values.formCheckboxes = [];
    inputsStateObj.symbol = null;
    inputsStateObj.name = null;
    inputsStateObj.decimals = null;
    inputsStateObj.premint = null;
    setInputsState(inputsStateObj);
    setCheckboxState({
      mintable: false,
      burnable: false,
      pausable: false,
      permit: false,
      votes: false,
      flashminting: false,
      snapshots: false,
    });
  };

  const handleSubmit = async () => {
    const checkBoxesList: {
      mintable: boolean;
      burnable: boolean;
      pausable: boolean;
      permit: boolean;
      votes: boolean;
      flashminting: boolean;
      snapshots: boolean;
    } = {
      mintable: false,
      burnable: false,
      pausable: false,
      permit: false,
      votes: false,
      flashminting: false,
      snapshots: false,
    };

    let i = 0;
    for (const checkboxItem in checkBoxesList) {
      if (checkBoxesList[formik.values.formCheckboxes[i]] === false) {
        checkBoxesList[formik.values.formCheckboxes[i]] = true;
      }
      i++;
    }

    setCheckboxState(checkBoxesList);

    setError({ text: "", type: "" });

    if (!formik.values.symbol) {
      setError({ text: "Please enter a symbol", type: "danger" });
      inputsStateObj.symbol = false;
      setInputsState(inputsStateObj);
      return;
    }

    const _symbol = parseInt(formik.values.symbol.charAt(0));
    if (!isNaN(_symbol)) {
      setError({
        text: "The symbol must not start with a number!",
        type: "danger",
      });
      inputsStateObj.symbol = false;
      setInputsState(inputsStateObj);
      return;
    }

    if (!/^[A-Za-z0-9]*$/.test(formik.values.symbol)) {
      setError({
        text: "The symbol must not contain special characters!",
        type: "danger",
      });
      inputsStateObj.symbol = false;
      setInputsState(inputsStateObj);
      return;
    } else {
      inputsStateObj.symbol = true;
      setInputsState(inputsStateObj);
    }

    if (!formik.values.name) {
      setError({ text: "Please enter a name", type: "danger" });
      inputsStateObj.name = false;
      setInputsState(inputsStateObj);
      return;
    } else {
      inputsStateObj.name = true;
      setInputsState(inputsStateObj);
    }

    if (!formik.values.decimals) {
      setError({ text: "Please enter a decimal", type: "danger" });
      inputsStateObj.decimals = false;
      setInputsState(inputsStateObj);
      return;
    } else if (Number(formik.values.decimals) > 18) {
      setError({
        text: "Decimal must be less than or equal to 18",
        type: "danger",
      });
      inputsStateObj.decimals = false;
      setInputsState(inputsStateObj);
      return;
    } else if (Number(formik.values.decimals) < 0) {
      setError({
        text: "Decimal must be greater than or equal to 0",
        type: "danger",
      });
      inputsStateObj.decimals = false;
      setInputsState(inputsStateObj);
      return;
    } else {
      inputsStateObj.decimals = true;
      setInputsState(inputsStateObj);
    }

    if (!formik.values.premint) {
      setError({ text: "Please enter a premint", type: "danger" });
      inputsStateObj.premint = false;
      setInputsState(inputsStateObj);
      return;
    } else if (Number(formik.values.premint) > 999_999_999_999_999_999) {
      setError({
        text: "Premint must be less than or equal to 999,999,999,999,999,999",
        type: "danger",
      });
      inputsStateObj.premint = false;
      setInputsState(inputsStateObj);
      return;
    } else if (Number(formik.values.premint) < 0) {
      setError({
        text: "Premint must be greater than or equal to 0",
        type: "danger",
      });
      inputsStateObj.premint = false;
      setInputsState(inputsStateObj);
      return;
    } else {
      inputsStateObj.premint = true;
      setInputsState(inputsStateObj);
    }

    if (activeNetwork?.chainId !== currentChain) {
      setError({
        text: "Connected wallet and selected network is not in the same network!",
        type: "danger",
      });
      return;
    }

    if (currentWallet === null) {
      setError({ text: "Please connect to a wallet", type: "danger" });
      return;
    } else if (currentWallet === "MetaMask") {
      if (provider === undefined) {
        setError({
          text: "Please connect to MetaMask",
          type: "warning",
        });
        return;
      }
    } else if (currentWallet === "WalletConnect") {
      if (provider === undefined) {
        setError({
          text: "Please connect to a wallet",
          type: "warning",
        });
        return;
      }
    }

    if (currentWallet === 'MetaMask' && (currentChain !== Number(window.ethereum.networkVersion))) {
      differentWalletNetworkNotify()
      return
    } else if (currentWallet === 'WalletConnect') {
      console.log('------')
    }
    setIsModalOpen(true);

    localStorage.setItem("user-wallet-connect", JSON.stringify(formik.values));

    if (socketError) {
      let paymentHash = JSON.parse(localStorage.getItem("payment-hash")!);

      if (paymentHash) {
        submitCreateTokenTransaction(paymentHash);
      }
    } else {
      // send transaction through the wallet.
      // console.log('activeNetwork data:', activeNetwork);
      getHash(activeNetwork?.createTokenCost, activeNetwork?.destinationWallet)
        .then(async (hash: string) => submitCreateTokenTransaction(hash))
        .catch((error) => {
          if (error === 4001) {
            setIsModalOpen(false);
            setError({
              text: "Your transaction is rejected by the user.",
              type: "danger",
            });
          }
        });
    }
  };

  useEffect(() => {
    if (currentWallet) {
      const selectedNetwork = supportedNetworks.find(
        (network) => network.chainId === currentChain
      );

      selectedNetwork && setActiveNetwork(selectedNetwork);

      if (selectedNetwork) {
        const network = NETWORKS_DATA.find(
          (network) => network.key === selectedNetwork?.key
        );

        network
          ? setSelectedNetwork(network)
          : setSelectedNetwork({
              img: "",
              protocol: "",
              key: selectedNetwork?.key,
              id: new Date().getTime(),
            });
      }
    }

    return () => {};
  }, [currentChain, supportedNetworks]);

  const networks = {
    polygon: {
      chainId: `0x${Number(137).toString(16)}`,
      chainName: "Polygon Mainnet",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
      },
      rpcUrls: ["https://polygon-rpc.com/"],
      blockExplorerUrls: ["https://polygonscan.com/"],
    },
    bsc: {
      chainId: `0x${Number(56).toString(16)}`,
      chainName: "Binance Smart Chain Mainnet",
      nativeCurrency: {
        name: "Binance Chain Native Token",
        symbol: "BNB",
        decimals: 18,
      },
      rpcUrls: [
        "https://bsc-dataseed1.binance.org",
        "https://bsc-dataseed2.binance.org",
        "https://bsc-dataseed3.binance.org",
        "https://bsc-dataseed4.binance.org",
        "https://bsc-dataseed1.defibit.io",
        "https://bsc-dataseed2.defibit.io",
        "https://bsc-dataseed3.defibit.io",
        "https://bsc-dataseed4.defibit.io",
        "https://bsc-dataseed1.ninicoin.io",
        "https://bsc-dataseed2.ninicoin.io",
        "https://bsc-dataseed3.ninicoin.io",
        "https://bsc-dataseed4.ninicoin.io",
        "wss://bsc-ws-node.nariox.org",
      ],
      blockExplorerUrls: ["https://bscscan.com"],
    },
  };

  useEffect(() => {
    if (!isTokenDeployed) {
      const formData = JSON.parse(localStorage.getItem("user-wallet-connect"));
      const paymentHash = JSON.parse(localStorage.getItem("payment-hash"));
      const prevNetwork = JSON.parse(localStorage.getItem("network"));

      if (formData) {
        if (paymentHash) {
          formData && formik.setValues(formData);

          if (prevNetwork) {
            connector.activate();
            currentWallet &&
              switchChain(
                chainList,
                provider,
                connector,
                currentChain,
                Number(prevNetwork)
              );
            setCurrentChain(prevNetwork);
          }
        }
      }
    }

    return () => {};
  }, []);

  useEffect(() => {
    currentWallet &&
      switchChain(
        chainList,
        provider,
        connector,
        currentChain,
        Number(currentChain)
      );
    currentWallet && setCurrentChain(currentChain);

    return () => {};
  }, [currentWallet]);

  function convertToSolidityFile() {
    let blob = new Blob([`${tokenData["source"]}`], {
      type: "text/plain;charset=utf-8",
    });
    FileSaver.saveAs(blob, `${formik.values.name}.sol`);
  }

  const disconnectFunctionality = () => {
    localStorage.removeItem("walletconnect");
    setSelectedNetwork(null);
    void connector.deactivate();
    setWalletConnectType(null);
  };

  const differentNetworkNotify = () =>
    toast.error("Please Scan QR Code", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const differentWalletNetworkNotify = () =>
    toast.error("Wallet network is different from the selected network", {
      position: "bottom-left",
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const notAllowedToggleNetworkNotify = () =>
    toast.error("You are not allowed to change network", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return (
    <div className="grid place-items-center bg-[#f8f9fd] w-full min-h-screen px-3">
      <Grid layout="B">
        <header className="flex justify-between items-center">
          <Logo />
          <MenuIcon />
        </header>
        <Container
          extendClasses={`relative py-1 flex flex-col flex-wrap gap-4 xs:flex-row justify-between xs:items-center md:col-span-2 ${
            currentWallet ? "border-gradient" : ""
          }`}
        >
          <div
            className="flex items-center justify-start gap-2 cursor-pointer text-right border-2 border-violet-50 rounded p-2"
            onClick={() => toggleNetworkModal()}
          >
            <p>Selected Network:</p>
            <div className="flex items-center gap-1 min-w-[75px]">
              {selectedNetwork ? (
                <>
                  <img
                    className="max-h-[1.25rem]"
                    src={selectedNetwork?.img}
                    alt=""
                  />
                  <span className="whitespace-nowrap text-left font-bold uppercase">
                    {selectedNetwork?.key}
                  </span>
                </>
              ) : (
                <span className="whitespace-nowrap text-left font-bold">
                  None
                </span>
              )}
            </div>
          </div>
          {currentWallet && (
            <div className="flex flex-row justify-center items-center px-4 py-2 mr-auto rounded-lg bg-danger text-white order-3 xs:order-none w-full xs:w-auto">
              <button
                className="btn btn-danger btn-sm"
                onClick={() => {
                  disconnectFunctionality();
                }}
              >
                Disconnect
              </button>
            </div>
          )}
          <Dropdown isDisabled={!selectedNetwork ? true : false} />
        </Container>
        <Container
          extendClasses={`relative md:py-6 max-h-[60rem] grid grid-cols-[75%_100%] sm:grid-cols-[1.1fr,1fr] gap-x-8 gap-y-7 md:gap-x-12 lg:gap-x-10 overflow-y-auto ${
            !isTokenDeployed ? "md:grid-rows-[1fr_auto]" : ""
          } min-h-[200px] md:col-start-2 overflow-x-auto md:col-span-2 ${
            !currentWallet && !isTokenDeployed
              ? "pointer-events-none after:absolute after:w-full after:h-full after:bg-white after:opacity-60"
              : ""
          } ${
            isTokenDeployed
              ? "border-gradient gap-y-2 grid-cols-1 w-full grid-rows-[auto_1fr]"
              : ""
          }`}
        >
          <header
            className={`col-span-2 flex items-center justify-between flex-wrap ${
              isTokenDeployed ? "" : "hidden"
            }`}
          >
            <p className="font-medium">
              2. You can download your smart-contract from here
            </p>
            <div
              className={`bg-[#D9E4FF] flex items-center gap-1 rounded py-0.5 px-2 transition-colors hover:bg-[#cdd9f8] ml-auto text-xs cursor-pointer ${
                isTokenDeployed ? "" : "hidden"
              }`}
              onClick={convertToSolidityFile}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download
            </div>
          </header>

          <FormikProvider value={formik}>
            <Form
              extendClasses={`w-full h-full px-1 grid-row-start-2 row-span-2 ${
                isTokenDeployed ? "hidden" : ""
              }`}
            >
              <FormInput
                id="symbol-input"
                name="symbol"
                type="text"
                label="symbol"
                value={formik.values.symbol.toUpperCase()}
                handleChange={formik.handleChange}
                isValid={inputsState.symbol}
                isRequired
              />
              <FormInput
                id="name-input"
                name="name"
                type="text"
                label="name"
                value={formik.values.name}
                handleChange={formik.handleChange}
                isValid={inputsState.name}
                isRequired
              />
              <FormInput
                id="decimals-input"
                name="decimals"
                type="number"
                label="decimals"
                value={formik.values.decimals}
                handleChange={formik.handleChange}
                isValid={inputsState.decimals}
                isRequired
              />
              <FormInput
                id="premint-input"
                name="premint"
                type="number"
                label="premint"
                value={formik.values.premint}
                handleChange={formik.handleChange}
                isValid={inputsState.premint}
                isRequired
              />
              <FormGroup
                title="Features"
                id="formCheckboxes"
                extendClasses="flex flex-wrap gap-y-5 gap-x-5"
              >
                {" "}
                <FormCheckBox
                  label="mintable"
                  value="mintable"
                  hasDescription
                  toolTipMessage={TOOLTIPS_MESSAGE.mintable}
                />
                <FormCheckBox
                  label="burnable"
                  value="burnable"
                  hasDescription
                  toolTipMessage={TOOLTIPS_MESSAGE.burnable}
                />
                <FormCheckBox
                  label="pausable"
                  value="pausable"
                  hasDescription
                  toolTipMessage={TOOLTIPS_MESSAGE.pausable}
                />
                <FormCheckBox
                  label="permit"
                  value="permit"
                  hasDescription
                  toolTipMessage={TOOLTIPS_MESSAGE.permit}
                />
                <FormCheckBox
                  label="votes"
                  value="votes"
                  hasDescription
                  toolTipMessage={TOOLTIPS_MESSAGE.votes}
                />
                <FormCheckBox
                  label="flash minting"
                  value="flashminting"
                  hasDescription
                  toolTipMessage={TOOLTIPS_MESSAGE.flashminting}
                />
                <FormCheckBox
                  label="snapshots"
                  value="snapshots"
                  hasDescription
                  toolTipMessage={TOOLTIPS_MESSAGE.snapshots}
                />
              </FormGroup>
              <FormInput
                id="license-input"
                name="license"
                type="text"
                label="license"
                value={formik.values.license}
                handleChange={formik.handleChange}
                isDisabled
              />
            </Form>
          </FormikProvider>

          <div
            className={`p-5 bg-type-700 break-all rounded-xl col-start-2 row-start-1 row-span-3 sm:row-span-1 max-h-[635px] sm:max-h-[465px] text-body-4 overflow-x-auto text-type-500 ${
              !currentWallet ? (!isTokenDeployed ? "opacity-50" : "") : ""
            } ${
              isTokenDeployed
                ? "col-start-1 col-span-2 row-start-2 mt-2"
                : "codebox"
            }`}
          >
            <CodeBox>
              {!isTokenDeployed
                ? `// SPDX-License-Identifier: ${formik.values.license}
pragma solidity ^0.8.4;
import "@oraclez/contracts/token/${selectedNetwork?.protocol}/${selectedNetwork?.protocol}.sol";
contract ${formik.values.name} is ${selectedNetwork?.protocol} {
    constructor() ${selectedNetwork?.protocol}("${formik.values.name}", "${formik.values.symbol}") {}
}`
                : `${tokenData["source"]}`}
            </CodeBox>

            {checkboxState.mintable && !isTokenDeployed ? (
              <Typewriter
                options={{
                  delay: 10,
                  cursor: "",
                }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString(CHECKBOXES_MESSAGE.mintable)
                    .typeString("<div></div>")
                    .start();
                }}
              />
            ) : (
              ""
            )}
            {checkboxState.burnable && !isTokenDeployed ? (
              <Typewriter
                options={{
                  delay: 10,
                  cursor: "",
                }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString(CHECKBOXES_MESSAGE.burnable)
                    .typeString("<div>")
                    .start();
                }}
              />
            ) : (
              ""
            )}
            {checkboxState.pausable && !isTokenDeployed ? (
              <Typewriter
                options={{
                  delay: 10,
                  cursor: "",
                }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString(CHECKBOXES_MESSAGE.pausable)
                    .typeString("<div>")
                    .start();
                }}
              />
            ) : (
              ""
            )}
            {checkboxState.permit && !isTokenDeployed ? (
              <>
                <Typewriter
                  options={{
                    delay: 10,
                    cursor: "",
                  }}
                  onInit={(typewriter) => {
                    typewriter
                      .typeString(CHECKBOXES_MESSAGE.permit)
                      .typeString("<div>")
                      .start();
                  }}
                />
              </>
            ) : (
              ""
            )}
            {checkboxState.votes && !isTokenDeployed ? (
              <Typewriter
                options={{
                  delay: 10,
                  cursor: "",
                }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString(CHECKBOXES_MESSAGE.votes)
                    .typeString("<div>")
                    .start();
                }}
              />
            ) : (
              ""
            )}
            {checkboxState.flashminting && !isTokenDeployed ? (
              <Typewriter
                options={{
                  delay: 10,
                  cursor: "",
                }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString(CHECKBOXES_MESSAGE.flashminting)
                    .typeString("<div>")
                    .start();
                }}
              />
            ) : (
              ""
            )}
            {checkboxState.snapshots && !isTokenDeployed ? (
              <Typewriter
                options={{
                  delay: 10,
                  cursor: "",
                }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString(CHECKBOXES_MESSAGE.snapshots)
                    .typeString("<div>")
                    .start();
                }}
              />
            ) : (
              ""
            )}
          </div>

          <Button
            type="default"
            variant="secondary"
            extendClasses={`col-start-1 sm:col-start-2 ${
              isTokenDeployed ? "hidden" : ""
            }`}
            handleClick={() => {
              formik.submitForm();
            }}
          >
            {transactionError ? "Try Again" : "Create Token"}
          </Button>
          {error?.text !== "" ? (
            <div
              className={` border-2 flex gap-2 items-center shadow-md w-full px-3 py-2 col-span-2 rounded-md text-body-4 text-white ${
                error?.type === "danger"
                  ? "text-danger bg-[#ffe3e0]"
                  : "border-orange-500 bg-orange-400"
              }`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.76 15.92L15.36 4.4C14.5 2.85 13.31 2 12 2C10.69 2 9.50001 2.85 8.64001 4.4L2.24001 15.92C1.43001 17.39 1.34001 18.8 1.99001 19.91C2.64001 21.02 3.92001 21.63 5.60001 21.63H18.4C20.08 21.63 21.36 21.02 22.01 19.91C22.66 18.8 22.57 17.38 21.76 15.92ZM11.25 9C11.25 8.59 11.59 8.25 12 8.25C12.41 8.25 12.75 8.59 12.75 9V14C12.75 14.41 12.41 14.75 12 14.75C11.59 14.75 11.25 14.41 11.25 14V9ZM12.71 17.71C12.66 17.75 12.61 17.79 12.56 17.83C12.5 17.87 12.44 17.9 12.38 17.92C12.32 17.95 12.26 17.97 12.19 17.98C12.13 17.99 12.06 18 12 18C11.94 18 11.87 17.99 11.8 17.98C11.74 17.97 11.68 17.95 11.62 17.92C11.56 17.9 11.5 17.87 11.44 17.83C11.39 17.79 11.34 17.75 11.29 17.71C11.11 17.52 11 17.26 11 17C11 16.74 11.11 16.48 11.29 16.29C11.34 16.25 11.39 16.21 11.44 16.17C11.5 16.13 11.56 16.1 11.62 16.08C11.68 16.05 11.74 16.03 11.8 16.02C11.93 15.99 12.07 15.99 12.19 16.02C12.26 16.03 12.32 16.05 12.38 16.08C12.44 16.1 12.5 16.13 12.56 16.17C12.61 16.21 12.66 16.25 12.71 16.29C12.89 16.48 13 16.74 13 17C13 17.26 12.89 17.52 12.71 17.71Z"
                  fill="#F84837"
                />
              </svg>

              <p className="pt-0.5">{error?.text}</p>
            </div>
          ) : (
            <div className="h-1 hidden" />
          )}
        </Container>
        <Container
          extendClasses={`relative px-4 pt-5 pb-5 flex flex-col md:col-start-2 md:col-span-2 ${
            isTokenDeployed ? "block border-gradient" : "hidden"
          }`}
        >
          <div className="flex items-center gap-2 mt-3 sm:mt-0">
            <GreenGuardIcon />
            <p className="text-success text-body-3 sm:text-body-2">
              Your Token has been deployed successfully
            </p>
            <div className="ml-auto flex gap-1 text-body-4 absolute right-2 top-2 sm:top-0 sm:relative">
              Status: <TickSquareIcon fill="#53D258" />{" "}
              <span className="text-success">Done</span>
            </div>
          </div>
          <div className="space-y-2 mt-4 mb-4">
            <div className="flex items-center p-4 rounded-lg bg-[#f4f8ff] max-w-2xl w-full gap-3 overflow-y-auto">
              <svg
                className="shrink-0"
                width="9"
                height="9"
                viewBox="0 0 9 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.5 9C6.98528 9 9 6.98528 9 4.5C9 2.01472 6.98528 0 4.5 0C2.01472 0 0 2.01472 0 4.5C0 6.98528 2.01472 9 4.5 9Z"
                  fill="#53D258"
                />
              </svg>
              <span className="font-light w-24 text-type-500 shrink-0">
                Deploy Token
              </span>
              <p className="font-medium shrink-0">
                <a
                  rel="noreferrer"
                  target="_blank"
                  href={tokenData["tokenUrl"]}
                >
                  {tokenData.deployedToken}
                </a>
              </p>
            </div>
            <div className="flex items-center p-4 rounded-lg bg-[#f4f8ff] max-w-2xl w-full gap-3 overflow-y-auto">
              <svg
                className="shrink-0"
                width="9"
                height="9"
                viewBox="0 0 9 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.5 9C6.98528 9 9 6.98528 9 4.5C9 2.01472 6.98528 0 4.5 0C2.01472 0 0 2.01472 0 4.5C0 6.98528 2.01472 9 4.5 9Z"
                  fill="#F7931A"
                />
              </svg>
              <span className="font-light w-24 text-type-500 shrink-0">
                Txid
              </span>
              <p className="font-medium shrink-0">
                <a
                  rel="noreferrer"
                  target="_blank"
                  href={tokenData["paymentHashUrl"]}
                >
                  {tokenData.paymentHash}
                </a>
              </p>
            </div>
            {/* <div className="flex items-center p-4 rounded-lg bg-[#f4f8ff] max-w-2xl w-full gap-3 overflow-y-auto">
              <svg
                className="shrink-0"
                width="9"
                height="9"
                viewBox="0 0 9 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.5 9C6.98528 9 9 6.98528 9 4.5C9 2.01472 6.98528 0 4.5 0C2.01472 0 0 2.01472 0 4.5C0 6.98528 2.01472 9 4.5 9Z"
                  fill="#FF6051"
                />
              </svg>
              <span className="font-light w-24 text-type-500 shrink-0">
                Network
              </span>
              <p className="font-medium shrink-0">
                {/* {selectedNetwork?.key[0].toUpperCase() +
                  selectedNetwork?.key.slice(1)} * /}
                { /*transactionNetwork* /}
              </p>
            </div> */}
          </div>
          <div className="max-w-[275px]">
            <Button
              type="default"
              variant="main"
              extendClasses="py-2"
              handleClick={() => {
                setIsTokenDeployed(false);
                clearFormInputs();
              }}
            >
              Back to Create Token
            </Button>
          </div>
        </Container>
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Grid>

      {isModalOpen && (
        <Modal
          extendedClasses="grid-rows-[minmax(0,2fr)_minmax(0,3fr)] shadow-xl"
          toggleModalState={toggleModalState}
        >
          Please Wait ...
          <br />
          {progressData?.value}
          <MeterSpinner extendedClasses="max-h-[12rem] mb-auto" />
        </Modal>
      )}
      {isNetworkModalOpen && (
        <NetworksModal toggleModalState={toggleNetworkModal}>
          {supportedNetworks.map((network, index) => (
            <li
              key={index}
              className={`border rounded-lg px-3 py-2 flex space-x-2 items-center cursor-pointer relative ${
                network.chainId === activeNetwork?.chainId
                  ? "selected-network"
                  : ""
              }`}
              onClick={() => {
                if (
                  currentWallet === "WalletConnect" &&
                  activeNetwork?.chainId !== Number(network.chainId)
                ) {
                  toggleNetworkModal();
                  differentNetworkNotify();
                  disconnectFunctionality();
                  walletConnect.activate(Number(network.chainId));
                }
                changeSelectedNetwork(
                  index,
                  network["key"],
                  NETWORKS_DATA.find((el) => el.key === network["key"])
                    ?.protocol || "",
                  NETWORKS_DATA.find((el) => el.key === network["key"])?.img ||
                    ""
                );
                currentWallet &&
                  switchChain(
                    chainList,
                    provider,
                    connector,
                    currentChain,
                    Number(network.chainId)
                  );
                setCurrentChain(Number(network.chainId));
                setActiveNetwork(network);
              }}
            >
              <div className="w-6 h-6">
                <img
                  className="w-full h-full"
                  src={
                    NETWORKS_DATA.find((el) => el.key === network["key"])?.img
                  }
                />
              </div>
              <span>{network["name"]}</span>
              {network.chainId === activeNetwork?.chainId ? (
                <TickSquareIcon extendedClasses="absolute right-2.5" />
              ) : (
                ""
              )}
            </li>
          ))}
        </NetworksModal>
      )}
    </div>
  );
};

export default Create;

export interface networkInterface {
  id: number;
  key: string;
  protocol?: string;
  img?: string;
}

export interface formDataInterface {
  symbol: string;
  name: string;
  decimals: string;
  premint: string;
  checkboxes: { [key: string]: boolean };
  license: string;
}

export interface ISupportedNetwork {
  name: string;
  key: string;
  chainId: number;
  providerUrl: string;
  coin: string;
  createTokenCost: number;
  testnet: boolean;
  destinationWallet: string;
  explorer?: string;
}
