import { FC, useContext, useState, useEffect, useRef } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  MetaMaskIcon,
  WalletConnectIcon,
  WalletIcon,
  ChevronDownIcon,
  ChevronTopIcon,
} from "@components/icons";
import MetaMaskCard from "container/Components/Connectors/MetaMaskCard";
import { hooks } from "container/Connectors/metaMask";
import { MainContext } from "context/MainProvider";
import { Accounts } from "container/Components/Accounts";
import WalletConnectCard from "container/Components/Connectors/WalletConnectCard";

const { useAccounts, useProvider, useENSNames } = hooks;

const Dropdown: FC<dropDownInterface> = ({ isDisabled, extendedClasses }) => {
  const { walletConnector, currentWallet } = useContext(MainContext);

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const accounts = useAccounts();
  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        setIsExpanded(false);
    });

    return () => {};
  }, []);

  useEffect(() => {
    currentWallet && setIsExpanded(false);

    return () => {};
  }, [currentWallet]);

  return (
    <div
      className={`text-left sm:text-right self-start xs:self-center ${extendedClasses} ${
        isDisabled && "pointer-events-none opacity-50"
      }`}
      ref={menuRef}
    >
      <div className="relative flex flex-col" ref={menuRef}>
        {!currentWallet && (
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className="menu__btn  flex justify-center items-center gap-2 rounded-md text-type-500 py-1.5 px-2 cursor-pointer hover:bg-violet-50 focus:outline-none focus:bg-violet-50 focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-opacity-5 border-2 border-violet-50"
          >
            <WalletIcon />

            <span>Connect a wallet</span>
            {isExpanded ? <ChevronTopIcon /> : <ChevronDownIcon />}
          </div>
        )}

        <div
          className={`menu__items absolute top-full grid grid-rows-2 mt-2 p-1 w-full origin-top-right divide-y z-10 divide-gray-50 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition ease-out duration-100 ${
            isExpanded
              ? "transform opacity-100 scale-100"
              : "transform opacity-0 scale-95 pointer-events-none"
          }`}
          onFocus={() => setIsExpanded(false)}
          onBlur={() => setIsExpanded(false)}
        >
          <div className="flex gap-1 rounded-md text-type-500 py-2 px-2 items-center sm:cursor-pointer sm:hover:bg-violet-50 focus:outline-none focus:bg-violet-50 focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-opacity-5 opacity-50 sm:opacity-100 cursor-not-allowed">
            <MetaMaskCard />
          </div>
          <div className="flex gap-1 rounded-md text-type-500 py-2 px-2 items-center cursor-pointer hover:bg-violet-50 focus:outline-none focus:bg-violet-50 focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-opacity-5">
            <WalletConnectCard />
          </div>
        </div>
      </div>

      {currentWallet === "MetaMask" ? (
        <MetaMaskCard />
      ) : currentWallet === "WalletConnect" ? (
        <WalletConnectCard />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Dropdown;

function WalletConnect() {
  return (
    <div className="h-5 w-5 mr-2">
      <WalletConnectIcon />
    </div>
  );
}

function MetaMask() {
  return (
    <div className="h-5 w-5 mr-2">
      <MetaMaskIcon />
    </div>
  );
}

export interface dropDownInterface {
  isDisabled?: boolean;
  extendedClasses?: string;
}
