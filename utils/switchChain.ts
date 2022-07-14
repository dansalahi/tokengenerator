import { Network } from "@web3-react/network";
import { WalletConnect } from "@web3-react/walletconnect";
import { getAddChainParameters } from "container/Chain";

export const switchChain = async (
  chainList,
  provider,
  connector,
  currentChain,
  desiredChainId: number
) => {
  const chainInformation = chainList.find(
    (item) => item.chainId === Number(desiredChainId)
  );

  // if we're already connected to the desired chain, return
  // if (desiredChainId === currentChain) return;
  // if they want to connect to the default chain and we're already connected, return
  if (desiredChainId === -1 && currentChain !== undefined) return;

  await provider;
  try {
    // check if the chain to connect to is installed
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${Number(desiredChainId).toString(16)}` }], // chainId must be in hexadecimal numbers
    });
  } catch (error) {
    // This error code indicates that the chain has not been added to MetaMask
    // if it is not, then install it into the user MetaMask
    if (error.code === 4902) {
      try {
        console.log(desiredChainId, chainInformation);

        if (chainInformation) {
          console.log(chainInformation);

          await provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: `0x${Number(chainInformation.chainId).toString(16)}`,
                chainName: chainInformation.name,
                nativeCurrency: chainInformation.nativeCurrency,
                rpcUrls: chainInformation.rpc,
                blockExplorerUrls: chainInformation.blockExplorerUrls,
              },
            ],
          });
        } else {
          await provider.request({
            method: "wallet_addEthereumChain",
            params: [desiredChainId],
          });
        }
      } catch (addError) {
        console.error(addError);
      }
    }
    console.error(error);
  }
  if (connector instanceof WalletConnect || connector instanceof Network) {
    await connector.activate(
      desiredChainId === -1 ? undefined : desiredChainId
    );
  } else {
    await connector.activate(
      desiredChainId === -1
        ? undefined
        : getAddChainParameters(chainList, desiredChainId)
    );
  }
};
