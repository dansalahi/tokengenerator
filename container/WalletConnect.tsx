import React, { useState, useEffect, useContext, useRef } from "react";
import {
  CardBody,
  CardText,
  Col,
  Modal,
  Row,
  TabContent,
  Table,
  TabPane,
  Tooltip,
} from "reactstrap";
import { io, Socket } from "socket.io-client";

import {
  useWeb3React,
  Web3ReactHooks,
  Web3ReactProvider,
} from "@web3-react/core";
// import { ReactComponent as Loader } from "./../../assets/images/drop_loader.svg";

import {
  CardHeader,
  CardTitle,
  Collapse,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
} from "reactstrap";

import { Card } from "./Components/Card";
import CoinbaseWalletCard from "./Components/Connectors/CoinbaseWalletCard";
import MetaMaskCard from "./Components/Connectors/MetaMaskCard";
import NetworkCard from "./Components/Connectors/NetworkCard";
import WalletConnectCard from "./Components/Connectors/WalletConnectCard";
import ProviderExample from "./Components/ProviderExample";
import { toHex } from "web3-utils";
import "./WalletConnect.module.css";
// import { getSymbolLogo } from "constants/coins";
// import CoinButton from "src/components/Common/CoinButton/CoinButton";
import classnames from "classnames";

import { BaseUrl, SocketUrl } from "configs/api.json";
import { MainContext } from "context/MainProvider";
import Link from "next/link";

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

const WalletConnectComponent = () => {
  const { currentWallet, walletConnector, currentChain } =
    useContext(MainContext);
  const [modal_backdrop, setmodal_backdrop] = useState(false);

  const [loading, setLoading] = useState(false);

  const [report, setReport] = useState<{
    status: string;
    network: string;
    paymentHash: string;
    paymentHashUrl: string;
    deployedToken: string;
    tokenUrl: string;
  } | null>(null);

  const [socketError, setSocketError] = useState<boolean>(false);

  const { connector } = useWeb3React();
  const { provider } = connector;

  const [text, setText] = useState<{
    text: string | React.ReactNode;
    type: string;
  } | null>();

  function tog_backdrop() {
    setmodal_backdrop(!modal_backdrop);
    removeBodyCss();
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  const [supportedNetworks, setSupportedNetworks] =
    useState<ISupportedNetwork[]>();

  const [formState, setFormState] = useState({
    network: "",
    symbol: "",
    name: "",
    decimals: 18,
    premint: 1000000000,
    mintable: false,
    burnable: false,
    pausable: false,
    permit: false,
    votable: false,
    flashMinting: false,
    snapshots: false,
    license: "MIT",
  });

  const [activeTab1, setactiveTab1] = useState("5");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("user-wallet-connect");
    if (data) {
      setFormState(JSON.parse(data));
    }
    getSupportedNetworks()
      .then((networks: ISupportedNetwork[]) => {
        setSupportedNetworks(networks);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  useEffect(() => {
    // const obj: any = JSON.parse(localStorage.getItem("authUser"))
    // console.log('local storage', obj)
    // if (obj?.accessToken)

    setSocket(
      io(SocketUrl, {
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

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      console.log("connnected");
      setSocketConnected(socket.connected);
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
      setSocketConnected(socket.connected);
    });

    socket.on("create-token-result", (data: any) => {
      console.log("data from socket");
      console.log(data);

      if (data?.status === "done") {
        setmodal_backdrop(false);
        setReport(data);
        // setText({
        //     text: (
        //         <React.Fragment>
        //             <p>Your token has been deployed </p>
        //             <p>{data?.deployOutput}</p>
        //             <p>{data?.deployedToken}</p>
        //         </React.Fragment>
        //     ),
        //     type: "success",
        // });
      }
      if (data?.status === "error") {
        setmodal_backdrop(false);
        setSocketError(true);
        setText({
          text: (
            <React.Fragment>
              <p>Error in your deployed token, Please try again.</p>
              <p>{data.deployOutput}</p>
            </React.Fragment>
          ),
          type: "danger",
        });
      }

      setLoading(false);
    });
  }, [socket]);

  const onSend = (data: any) => {
    socket?.emit("create-token", data);
  };

  const getSupportedNetworks = () => {
    return new Promise<ISupportedNetwork[]>(async (resolve, reject) => {
      try {
        const response = await fetch(
          BaseUrl + "create-tokens/supportedNetworks"
        );
        if (response) {
          const data = await response.json();
          if (data) resolve(data);
          else reject();
        } else {
          // TODO: Error handling
        }
      } catch (error) {
        reject(error);
        console.log("error", error);
      }
    });
  };

  // const toggle1 = (tab: any) => {
  //     if (activeTab1 !== tab) {
  //         setactiveTab1(tab);
  //     }
  // };

  const [activeNetwork, setActiveNetwork] = useState<ISupportedNetwork>({
    name: "Binance Smart Chain",
    key: "bsc",
    chainId: 56,
    providerUrl: "https://bsc-dataseed.binance.org/",
    coin: "BNB",
    createTokenCost: 0.1,
    testnet: false,
    explorer: "https://bscscan.com",
    destinationWallet: "0xe6D4c887D1f0FF0ce1dFb76c0BFEc6109A1bc195",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.checked });
  };

  const getHash = (value: number, destAddress: string) => {
    return new Promise<string>(async (resolve, reject) => {
      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });

      let _value = toHex(value);
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
          // console.log('txHash: ', txHash);
          // generatedHash = txHash
          // setHash(txHash)
          // resolve(txHash)
          setTimeout(() => resolve(txHash), 5000);
        })
        .catch((error: any) => {
          if (error.code === 4001) {
            reject(4001);
          }

          // console.log('error: ', error);
          // setLoading(false)
        });
    });
  };

  const submitCreateTokenTransaction = (hash: string) => {
    const {
      symbol,
      name,
      decimals,
      premint,
      mintable,
      burnable,
      pausable,
      permit,
      votable,
      flashMinting,
      snapshots,
      license,
    } = formState;

    const data = {
      network: activeNetwork.key,
      symbol: symbol,
      name: name,
      decimals: decimals,
      paymentHash: hash,
      createParams: {
        mintable: mintable,
        burnable: burnable,
        pausable: pausable,
        permit: permit,
        votable: votable,
        flashMinting: flashMinting,
        snapshots: snapshots,
        license: license,
        premint: premint,
      },
    };

    if (!hash) {
      setText({
        text: "Something went wrong. Please try again later.",
        type: "danger",
      });
      return;
    }

    localStorage.setItem("payment-hash", JSON.stringify(hash));
    onSend(data);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setText(null);

    if (!formState.symbol) {
      setText({ text: "Please enter a symbol", type: "danger" });
      return;
    }

    const _symbol = parseInt(formState.symbol.charAt(0));

    if (!isNaN(_symbol)) {
      setText({
        text: "The symbol must not start with a number!",
        type: "danger",
      });
      return;
    }

    if (!/^[A-Za-z0-9]*$/.test(formState.symbol)) {
      setText({
        text: "The symbol must not contain special characters!",
        type: "danger",
      });
      return;
    }

    if (activeNetwork.chainId !== currentChain) {
      setText({
        text: "Connected wallet and selected network is not in the same network!",
        type: "danger",
      });
      return;
    }

    if (currentWallet === null) {
      setText({ text: "Please connect to a wallet", type: "danger" });
      return;
    } else if (currentWallet === "MetaMask") {
      if (provider === undefined) {
        setText({
          text: "Please connect to MetaMask",
          type: "warning",
        });
        return;
      }
    }
    // else if (currentWallet === "WalletConnect") {

    //   return
    // }

    setLoading(true);

    localStorage.setItem("user-wallet-connect", JSON.stringify(formState));
    tog_backdrop();

    // TODO:
    if (socketError) {
      let paymentHash = JSON.parse(localStorage.getItem("payment-hash")!);

      if (paymentHash) {
        submitCreateTokenTransaction(paymentHash);
      }
    } else {
      // send transaction through the wallet.
      getHash(activeNetwork.createTokenCost, activeNetwork.destinationWallet)
        .then(async (hash: string) => submitCreateTokenTransaction(hash))
        .catch((error) => {
          if (error === 4001) {
            setLoading(false);
            setmodal_backdrop(false);
            setText({
              text: "Your transaction is rejected by the user.",
              type: "danger",
            });
          }
        });
    }
  };

  const [tooltips, setTooltips] = useState({
    maintable: false,
    burnable: false,
    pausable: false,
    permit: false,
    votable: false,
    flashMinting: false,
    snapshots: false,
  });

  const btnClassNames = (network: ISupportedNetwork) => {
    return `${
      activeNetwork && activeNetwork.key === network.key
        ? "active__btn"
        : "custom__btn"
    }`;
  };

  return (
    <div>
      <Row>
        <Col lg={12}>
          <ProviderExample />

          <div className="d-flex flex-row justify-content-center align-items-center">
            {/* <WalletConnectCard  />
            <MetaMaskCard /> */}

            <CoinbaseWalletCard />
            <NetworkCard />
          </div>
        </Col>
      </Row>

      <Row>
        <Col className="mx-auto" lg={12}>
          <Row className="custom__card">
            <Col
              lg={3}
              md={3}
              className="right__col d-flex flex-column justify-content-between align-items-center"
            >
              <Row className="mt-4 mx-auto">
                {supportedNetworks &&
                  supportedNetworks.map(
                    (network: ISupportedNetwork, index: number) => {
                      return (
                        <Col lg={6} md={6} sm={12} key={network.key}>
                          <button
                            className={btnClassNames(network)}
                            onClick={() => setActiveNetwork(network)}
                          >
                            {/* {getSymbolLogo(network.key) ? (
                              <img
                                className="coin-image"
                                src={getSymbolLogo(network.key)}
                                alt={network.key}
                                height="18"
                                style={{
                                  marginRight: ".2rem",
                                }}
                              />
                            ) : null} */}

                            {network.key}
                          </button>
                        </Col>
                      );
                    }
                  )}
              </Row>

              <div>
                <h5 className="text-center text-light">Create Token</h5>
                <p className="text-light text-center">
                  Simple, Fast, Convenient No programming skills required Get
                  100% ownership of generated tokens Custom token name, symbol
                  and initial supply Automatic verified and published contract
                  source code
                </p>
              </div>
            </Col>

            <Col lg={9} md={9} className="bg-light left__col pt-4 pb-2 px-3">
              <Row>
                <Col sm="12" className="px-4">
                  {text && (
                    <div className={`alert alert-${text.type}`} role="alert">
                      {text.text}
                    </div>
                  )}
                  {report === null ? (
                    <React.Fragment>
                      <form onSubmit={handleSubmit}>
                        <div className="form-group mb-2">
                          <label htmlFor="selectedNetwork">
                            Selectd Network:
                          </label>{" "}
                          <strong className="text-uppercase text-info">
                            {activeNetwork && activeNetwork.key}
                          </strong>
                        </div>
                        <div className="form-group mb-2">
                          <label htmlFor="symbol">
                            Symbol <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="symbol"
                            name="symbol"
                            value={formState.symbol}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="form-group mb-2">
                          <label htmlFor="name">
                            Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="form-group mb-2">
                          <label htmlFor="decimals">
                            Decimals <span className="text-danger">*</span>
                          </label>
                          <input
                            type="number"
                            min={0}
                            max={18}
                            className="form-control"
                            id="decimals"
                            name="decimals"
                            value={formState.decimals}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="form-group mb-2">
                          <label htmlFor="premint">
                            Premint <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="premint"
                            name="premint"
                            value={formState.premint}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="form-group mb-2 ">
                          <label htmlFor="Features">Features</label>

                          <div className="d-flex justify-content-around align-items-center">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                name="mintable"
                                checked={formState.mintable}
                                onChange={handleChangeCheckbox}
                                type="checkbox"
                                id="Mintable"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="Mintable"
                              >
                                Mintable
                              </label>

                              <Tooltip
                                placement="right"
                                isOpen={tooltips.maintable}
                                target="TooltipRightmintable"
                                toggle={() => {
                                  setTooltips({
                                    ...tooltips,
                                    maintable: !tooltips.maintable,
                                  });
                                }}
                              >
                                Privileged accounts will be able to create more
                                supply.
                              </Tooltip>
                              <span
                                id="TooltipRightmintable"
                                className="badge badge-secondary "
                              >
                                <i className="fas fa-question-circle text-secondary"></i>
                              </span>
                            </div>

                            <div className="form-check">
                              <input
                                className="form-check-input"
                                name="burnable"
                                checked={formState.burnable}
                                onChange={handleChangeCheckbox}
                                type="checkbox"
                                id="Burnable"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="Burnable"
                              >
                                Burnable
                              </label>

                              <Tooltip
                                placement="right"
                                isOpen={tooltips.burnable}
                                target="TooltipRightburnable"
                                toggle={() => {
                                  setTooltips({
                                    ...tooltips,
                                    burnable: !tooltips.burnable,
                                  });
                                }}
                              >
                                Token holders will be able to destroy their
                                tokens.
                              </Tooltip>
                              <span
                                id="TooltipRightburnable"
                                className="badge badge-secondary "
                              >
                                <i className="fas fa-question-circle text-secondary"></i>
                              </span>
                            </div>

                            <div className="form-check">
                              <input
                                className="form-check-input"
                                name="pausable"
                                type="checkbox"
                                checked={formState.pausable}
                                onChange={handleChangeCheckbox}
                                id="Pausable"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="Pausable"
                              >
                                Pausable
                              </label>

                              <Tooltip
                                placement="right"
                                isOpen={tooltips.pausable}
                                target="TooltipRightpausable"
                                toggle={() => {
                                  setTooltips({
                                    ...tooltips,
                                    pausable: !tooltips.pausable,
                                  });
                                }}
                              >
                                Privileged accounts will be able to pause the
                                functionality marked as whenNotPaused. Useful
                                for emergency response.
                              </Tooltip>
                              <span
                                id="TooltipRightpausable"
                                className="badge badge-secondary "
                              >
                                <i className="fas fa-question-circle text-secondary"></i>
                              </span>
                            </div>

                            <div className="form-check">
                              <input
                                className="form-check-input"
                                name="permit"
                                checked={formState.permit}
                                onChange={handleChangeCheckbox}
                                type="checkbox"
                                id="Permit"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="Permit"
                              >
                                Permit
                              </label>

                              <Tooltip
                                placement="right"
                                isOpen={tooltips.permit}
                                target="TooltipRightPermit"
                                toggle={() => {
                                  setTooltips({
                                    ...tooltips,
                                    permit: !tooltips.permit,
                                  });
                                }}
                              >
                                Without paying gas, token holders will be able
                                to allow third parties to transfer from their
                                account. EIP is still Draft and may change.
                              </Tooltip>
                              <span
                                id="TooltipRightPermit"
                                className="badge badge-secondary "
                              >
                                <i className="fas fa-question-circle text-secondary"></i>
                              </span>
                            </div>

                            <div className="form-check">
                              <input
                                className="form-check-input"
                                name="votable"
                                checked={formState.votable}
                                onChange={handleChangeCheckbox}
                                type="checkbox"
                                id="Votes"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="Votes"
                              >
                                Votes
                              </label>
                              <Tooltip
                                placement="right"
                                isOpen={tooltips.votable}
                                target="TooltipRightVotable"
                                toggle={() => {
                                  setTooltips({
                                    ...tooltips,
                                    votable: !tooltips.votable,
                                  });
                                }}
                              >
                                Keeps track of historical balances for voting in
                                on-chain governance, with a way to delegate
                                one&apos;s voting power to a trusted account.
                              </Tooltip>
                              <span
                                id="TooltipRightVotable"
                                className="badge badge-secondary "
                              >
                                <i className="fas fa-question-circle text-secondary"></i>
                              </span>
                            </div>

                            <div className="form-check">
                              <input
                                className="form-check-input"
                                name="flashMinting"
                                checked={formState.flashMinting}
                                onChange={handleChangeCheckbox}
                                type="checkbox"
                                id="Flash Minting"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="Flash Minting"
                              >
                                Flash Minting
                              </label>

                              <Tooltip
                                placement="right"
                                isOpen={tooltips.flashMinting}
                                target="flashMinting"
                                toggle={() => {
                                  setTooltips({
                                    ...tooltips,
                                    flashMinting: !tooltips.flashMinting,
                                  });
                                }}
                              >
                                Built-in flash loans. Lend tokens without
                                requiring collateral as long as they&apos;re
                                returned in the same transaction.
                              </Tooltip>
                              <span
                                id="flashMinting"
                                className="badge badge-secondary "
                              >
                                <i className="fas fa-question-circle text-secondary"></i>
                              </span>
                            </div>

                            <div className="form-check">
                              <input
                                className="form-check-input"
                                name="snapshots"
                                checked={formState.snapshots}
                                onChange={handleChangeCheckbox}
                                type="checkbox"
                                id="Snapshots"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="Snapshots"
                              >
                                Snapshots
                              </label>

                              <Tooltip
                                placement="right"
                                isOpen={tooltips.snapshots}
                                target="snapshots"
                                toggle={() => {
                                  setTooltips({
                                    ...tooltips,
                                    snapshots: !tooltips.snapshots,
                                  });
                                }}
                              >
                                Privileged accounts will be able to store
                                snapshots of balances that can be retrieved
                                later. For on-chain voting, the Votes option is
                                preferable.
                              </Tooltip>
                              <span
                                id="snapshots"
                                className="badge badge-secondary "
                              >
                                <i className="fas fa-question-circle text-secondary"></i>
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="form-group mb-3">
                          <label htmlFor="License">License</label>
                          <input
                            disabled
                            type="text"
                            className="form-control"
                            id="License"
                            name="license"
                            onChange={(event) =>
                              setFormState({
                                ...formState,
                                license: event.target.value,
                              })
                            }
                            value={formState.license}
                            placeholder="MIT"
                          />
                        </div>

                        <div className="form-group my-2">
                          <button
                            type="submit"
                            className="btn btn-info waves-effect waves-light"
                            disabled={loading}
                            // onClick={() => {

                            // }}
                            data-toggle="modal"
                          >
                            <i
                              className={` ${
                                loading ? "bx bx-hourglass bx-spin" : ""
                              }  font-size-16 align-middle me-2`}
                            ></i>{" "}
                            Create Token
                          </button>
                        </div>
                      </form>

                      <Modal
                        isOpen={modal_backdrop}
                        toggle={() => {
                          tog_backdrop();
                        }}
                        backdrop={"static"}
                        id="staticBackdrop"
                        centered={true}
                        size="sm"
                      >
                        <div className="modal-header">
                          <h5 className="modal-title" id="staticBackdropLabel">
                            Please Wait...
                          </h5>
                          {/* <button
                                                        type="button"
                                                        className="btn-close"
                                                        onClick={() => {
                                                            setmodal_backdrop(false);
                                                        }}
                                                        aria-label="Close"
                                                    ></button> */}
                        </div>
                        <div className="modal-body">
                          <div className="text-center">
                            <p>
                              Dear User, Your token is generating. It takes
                              approximately 1 minute to get your request.
                            </p>
                            {/* <i
                                                            className={`bx bx-hourglass bx-spin`}
                                                        ></i> */}
                            {/* <Loader height="100" /> */}
                          </div>
                        </div>
                        {/* <div className="modal-footer">
                                                    <button
                                                        type="button"
                                                        className="btn btn-light"
                                                        onClick={() => {
                                                            setmodal_backdrop(false);
                                                        }}
                                                    >
                                                        Close
                                                    </button>
                                                    <button type="button" className="btn btn-primary">
                                                        Understood
                                                    </button>
                                                </div> */}
                      </Modal>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <div className="d-flex flex-column justify-content-start align-items-start">
                        <h5 className="text-success">
                          Your Token has been deployed successfully.
                        </h5>
                        <div className="form-group mb-3">
                          <label htmlFor="DeployToken">Deploy Token:</label>
                          <p className="text-primary">
                            {/* {activeNetwork.key.toLowerCase() === "bsctestnet" ? <> */}
                            <a
                              rel="noreferrer"
                              target="_blank"
                              href={`${report.tokenUrl}`}
                            >
                              {report.deployedToken}
                            </a>
                            {/* </> : <> */}
                            {/* <a rel="noreferrer" target="_blank" href={`https://bscscan.com/token/${report.deployedToken}`}>{report.deployedToken}</a> */}
                            {/* </>} */}
                          </p>
                        </div>

                        <div className="form-group mb-3">
                          <label htmlFor="TxnHash">Txid:</label>
                          <p className="text-primary">
                            {/* {activeNetwork.key.toLowerCase() === "bsctestnet" ? <> */}
                            <a
                              rel="noreferrer"
                              target="_blank"
                              href={`${report.paymentHashUrl}`}
                            >
                              {report.paymentHash}
                            </a>
                            {/* </> : <> */}
                            {/* <a rel="noreferrer" target="_blank" href={`https://bscscan.com/tx/${report.paymentHash}`}>{report.paymentHash}</a> */}
                            {/* </>} */}
                          </p>
                        </div>

                        <div className="form-group mb-3">
                          <label htmlFor="Network">Network:</label>
                          <p className="text-primary">{report.network}</p>
                        </div>

                        <div className="form-group mb-3">
                          <label htmlFor="status">Status:</label>
                          <p
                            className={`${
                              report.status === "done"
                                ? "text-success"
                                : "text-danger"
                            }`}
                          >
                            {report.status}
                          </p>
                        </div>
                        <a
                          role="button"
                          className="btn btn-primary"
                          href="/generateToken"
                        >
                          Back to Create Token
                        </a>
                      </div>
                    </React.Fragment>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default WalletConnectComponent;

{
  /* <Nav pills className="navtab-bg nav-justified">
<NavItem>
  <NavLink
    style={{ cursor: "pointer" }}
    className={classnames({
      active: activeTab1 === "5",
    })}
    onClick={() => {
      toggle1("5");
    }}
  >
    Create Token
  </NavLink>
</NavItem>
<NavItem>
  <NavLink
    disabled
    style={{ cursor: "pointer" }}
    className={classnames({
      active: activeTab1 === "6",
    })}
    onClick={() => {
      toggle1("6");
    }}
  >
    Create NFT
  </NavLink>
</NavItem>
<NavItem>
  <NavLink
    disabled
    style={{ cursor: "pointer" }}
    className={classnames({
      active: activeTab1 === "7",
    })}
    onClick={() => {
      toggle1("7");
    }}
  >
    Create Token Locker
  </NavLink>
</NavItem>
<NavItem>
  <NavLink
    disabled
    style={{ cursor: "pointer" }}
    className={classnames({
      active: activeTab1 === "8",
    })}
    onClick={() => {
      toggle1("8");
    }}
  >
    Create Token Presale
  </NavLink>
</NavItem>
</Nav>

<TabContent activeTab={activeTab1} className="p-3 text-muted">
<TabPane tabId="5">

</TabPane>
<TabPane tabId="6">
  <Row>
    <Col sm="12">
      <CardText className="mb-0">
        Food truck fixie locavore, accusamus mcsweeney's
        marfa nulla single-origin coffee squid. Exercitation
        +1 labore velit, blog sartorial PBR leggings next
        level wes anderson artisan four loko farm-to-table
        craft beer twee. Qui photo booth letterpress,
        commodo enim craft beer mlkshk aliquip jean shorts
        ullamco ad vinyl cillum PBR. Homo nostrud organic,
        assumenda labore aesthetic magna delectus mollit.
        Keytar helvetica VHS salvia yr, vero magna velit
        sapiente labore stumptown. Vegan fanny pack odio
        cillum wes anderson 8-bit.
      </CardText>
    </Col>
  </Row>
</TabPane>
<TabPane tabId="7">
  <Row>
    <Col sm="12">
      <CardText className="mb-0">
        Etsy mixtape wayfarers, ethical wes anderson tofu
        before they sold out mcsweeney's organic lomo retro
        fanny pack lo-fi farm-to-table readymade. Messenger
        bag gentrify pitchfork tattooed craft beer, iphone
        skateboard locavore carles etsy salvia banksy hoodie
        helvetica. DIY synth PBR banksy irony. Leggings
        gentrify squid 8-bit cred pitchfork. Williamsburg
        banh mi whatever gluten-free, carles pitchfork
        biodiesel fixie etsy retro mlkshk vice blog.
        Scenester cred you probably haven't heard of them,
        vinyl craft beer blog stumptown. Pitchfork
        sustainable tofu synth chambray yr.
      </CardText>
    </Col>
  </Row>
</TabPane>

<TabPane tabId="8">
  <Row>
    <Col sm="12">
      <CardText className="mb-0">
        Trust fund seitan letterpress, keytar raw denim
        keffiyeh etsy art party before they sold out master
        cleanse gluten-free squid scenester freegan cosby
        sweater. Fanny pack portland seitan DIY, art party
        locavore wolf cliche high life echo park Austin.
        Cred vinyl keffiyeh DIY salvia PBR, banh mi before
        they sold out farm-to-table VHS viral locavore cosby
        sweater. Lomo wolf viral, mustache readymade
        thundercats keffiyeh craft beer marfa ethical. Wolf
        salvia freegan, sartorial keffiyeh echo park vegan.
      </CardText>
    </Col>
  </Row>
</TabPane>
</TabContent> */
}
