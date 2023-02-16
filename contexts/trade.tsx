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
  // tradeState: {},
  // setTradeState: (state: any) => {},

  // wallet: {} as AppWallet,
  // setWallet: (wallet: AppWallet) => {},
  // walletNetwork: 0,
  // setWalletNetwork: (network: number) => {},
  // walletConnected: false,
});

export const TradeProvider = ({ children }) => {
  const [userAddressOrHandler, setUserAddressOrHandler] = useState("");

  const { connected, wallet } = useWallet();

  useEffect(() => {
    async function load() {
      const usedAddresses = await wallet.getUsedAddresses();
      setUserAddressOrHandler(usedAddresses[0]);
    }
    if (connected) {
      load();
    }
  }, [connected]);

  const memoedValue = useMemo(
    () => ({
      userAddressOrHandler,
    }),
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
