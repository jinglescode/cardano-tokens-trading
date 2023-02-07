import { useWallet } from "@meshsdk/react";
import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
} from "react";

const TradeContext = createContext({
  userAddressOrHandler: "",
  // wallet: {} as AppWallet,
  // setWallet: (wallet: AppWallet) => {},
  // walletNetwork: 0,
  // setWalletNetwork: (network: number) => {},
  // walletConnected: false,
});

export const TradeProvider = ({ children }) => {
  const [userAddressOrHandler, setUserAddressOrHandler] = useState("");

  const { connected, wallet } = useWallet();

  // const [wallet, setWallet] = useState<AppWallet>({} as AppWallet);
  // const [walletNetwork, setWalletNetwork] = useState<number>(0);

  // const walletConnected = useMemo(() => {
  //   return Object.keys(wallet).length == 0 ? false : true;
  // }, [wallet]);

  useEffect(() => {
    async function load() {
      const usedAddresses = await wallet.getUsedAddresses();
      console.log("usedAddresses[0]", usedAddresses[0]);
      setUserAddressOrHandler(usedAddresses[0]);
    }
    if (connected) {
      load();
    }
  }, [connected]);

  const memoedValue = useMemo(
    () => ({
      userAddressOrHandler,
      // wallet,
      // setWallet,
      // walletNetwork,
      // setWalletNetwork,
      // walletConnected,
    }),
    // [wallet, walletNetwork, walletConnected]
    [userAddressOrHandler]
  );

  return (
    <TradeContext.Provider value={memoedValue}>
      {children}
    </TradeContext.Provider>
  );
};

export default function useTrade() {
  return useContext(TradeContext);
}
