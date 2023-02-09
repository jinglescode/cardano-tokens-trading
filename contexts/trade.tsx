import { useWallet } from "@meshsdk/react";
import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
} from "react";
import { ConnectionStates } from "@/types/connectionStates";

const TradeContext = createContext({
  userAddressOrHandler: "",
  connectionState: "",
  setConnectionState: (state: any) => {},
  tradeState: {},
  setTradeState: (state: any) => {},

  // wallet: {} as AppWallet,
  // setWallet: (wallet: AppWallet) => {},
  // walletNetwork: 0,
  // setWalletNetwork: (network: number) => {},
  // walletConnected: false,
});

export const TradeProvider = ({ children }) => {
  const [userAddressOrHandler, setUserAddressOrHandler] = useState("");
  const [connectionState, setConnectionState] = useState(ConnectionStates.init);
  const [tradeState, setTradeState] = useState({
    usersTrades: {},
    usersState: {},
    usersSelectedUtxos: {},
    usersChangeAddress: {},
    numParticipants: 0,
    tradeAddresses: {},
  });

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
      connectionState,
      setConnectionState,
      tradeState,
      setTradeState,
      // wallet,
      // setWallet,
      // walletNetwork,
      // setWalletNetwork,
      // walletConnected,
    }),
    // [wallet, walletNetwork, walletConnected]
    [userAddressOrHandler, connectionState, tradeState]
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
