import type { BigNumber } from "@ethersproject/bignumber";
import { formatEther } from "@ethersproject/units";
import type { Web3ReactHooks } from "@web3-react/core";
import { useEffect, useState, useContext } from "react";
import { MainContext } from "context/MainProvider";
import { MetaMaskIcon, WalletConnectIcon } from "@components/icons";

function useBalances(
  provider?: ReturnType<Web3ReactHooks["useProvider"]>,
  accounts?: string[]
): BigNumber[] | undefined {
  const [balances, setBalances] = useState<BigNumber[] | undefined>();

  useEffect(() => {
    if (provider && accounts?.length) {
      let stale = false;

      void Promise.all(
        accounts.map((account) => provider.getBalance(account))
      ).then((balances) => {
        if (!stale) {
          setBalances(balances);
        }
      });

      return () => {
        stale = true;
        setBalances(undefined);
      };
    }
  }, [provider, accounts]);

  return balances;
}

export function Accounts({
  accounts,
  provider,
  ENSNames,
}: {
  accounts: ReturnType<Web3ReactHooks["useAccounts"]>;
  provider: ReturnType<Web3ReactHooks["useProvider"]>;
  ENSNames: ReturnType<Web3ReactHooks["useENSNames"]>;
}) {
  const balances = useBalances(provider, accounts);

  const { currentWallet } = useContext(MainContext);

  if (accounts === undefined) return null;

  // accounts.map((item: string) => console.log("item", item));

  const _add = (str: string) => {
    let start = str.slice(0, 10);
    let end = str.slice(-3);
    return `${start}...${end}`;
  };

  const limitBalanceLength = (balanceNum) => {
    if (window.innerWidth > 375) {
      return balanceNum;
    } else if (balanceNum.length > 12) {
      return Number(balanceNum).toFixed(7);
    } else {
      return Number(balanceNum).toFixed(5);
    }
  };

  return (
    <div>
      {/* <strong> */}
      {accounts.length === 0
        ? "None"
        : accounts?.map((account: string, i: number) => {
            let _num = _add(ENSNames?.[i] ?? account);
            return (
              <ul key={account} className="flex items-center gap-4">
                <div className="flex items-center justify-center gap-2">
                  {_num}
                </div>
                <div className="flex items-center gap-1 font-semibold">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 10.9699V13.03C22 13.58 21.56 14.0299 21 14.0499H19.0399C17.9599 14.0499 16.97 13.2599 16.88 12.1799C16.82 11.5499 17.0599 10.9599 17.4799 10.5499C17.8499 10.1699 18.36 9.94995 18.92 9.94995H21C21.56 9.96995 22 10.4199 22 10.9699Z"
                      fill="#191635"
                    />
                    <path
                      opacity="0.4"
                      d="M17.48 10.55C17.06 10.96 16.82 11.55 16.88 12.18C16.97 13.26 17.96 14.05 19.04 14.05H21V15.5C21 18.5 19 20.5 16 20.5H7C4 20.5 2 18.5 2 15.5V8.5C2 5.78 3.64 3.88 6.19 3.56C6.45 3.52 6.72 3.5 7 3.5H16C16.26 3.5 16.51 3.50999 16.75 3.54999C19.33 3.84999 21 5.76 21 8.5V9.95001H18.92C18.36 9.95001 17.85 10.17 17.48 10.55Z"
                      fill="#191635"
                    />
                    <path
                      d="M13 9.75H7C6.59 9.75 6.25 9.41 6.25 9C6.25 8.59 6.59 8.25 7 8.25H13C13.41 8.25 13.75 8.59 13.75 9C13.75 9.41 13.41 9.75 13 9.75Z"
                      fill="#191635"
                    />
                  </svg>

                  {balances?.[i]
                    ? ` (${limitBalanceLength(formatEther(balances[i]))})`
                    : null}
                </div>
              </ul>
            );
          })}
      {/* </strong> */}
    </div>
  );
}
