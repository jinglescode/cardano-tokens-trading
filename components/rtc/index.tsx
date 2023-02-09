import { useTrading } from "@/hooks/useTrading";
import { useEffect, useState } from "react";
import { ConnectionStates } from "@/types/connectionStates";
import { useWallet } from "@meshsdk/react";
import JoinRoom from "../JoinRoom";
import Navbar from "@/components/Navbar";
import Login from "@/components/login";
import Connecting from "../Connecting";
import Trade from "@/components/Trade";
import useTrade from "@/contexts/trade";

export default function RTC() {
  const { connected, wallet } = useWallet();
  const [walletAssets, setWalletAssets] = useState([]);

  const {
    btnMute,
    userMicActive,
    user,
    endSession,
    openTradeRoom,
    joinTradeRoom,
    updateTradeAsset,
    userAcceptTrade,
  } = useTrading();

  const { connectionState, tradeState } = useTrade();
  console.log("tradeState", tradeState)

  useEffect(() => {
    async function loadAssets() {
      const assets = await wallet.getAssets();
      setWalletAssets(assets);
    }
    if (connected && walletAssets.length == 0) {
      loadAssets();
    }
  }, [connected]);

  useEffect(
    () => () => {
      if (connectionState !== ConnectionStates.init) {
        console.log("unmount broadcast");
        endSession();
      }
    },
    []
  );

  return (
    <>
      <section className="h-screen bg-[url('https://meshjs.dev/logo-mesh/mesh.png')] bg-no-repeat bg-cover bg-center bg-gray-700 bg-blend-multiply bg-opacity-60">
        <Navbar
          btnMute={btnMute}
          userMicActive={userMicActive}
          connectionState={connectionState}
        />

        {/* WIP for editing style */}
        {/* <Trade /> */}

        {!connected && <Login />}

        {connectionState == ConnectionStates.readyToConnect && <JoinRoom />}

        {connectionState == ConnectionStates.connecting && <Connecting />}

        {(connectionState == ConnectionStates.connected ||
          connectionState == ConnectionStates.broadcasting) && (
          <Trade
            updateTradeAsset={updateTradeAsset}
            tradeState={tradeState}
            user={user}
          />
        )}
      </section>
    </>
  );

  return (
    <>
      <p>tradeState</p>
      <pre>{JSON.stringify(tradeState, null, 2)}</pre>
      {/* <p>connectionState</p>
      <p>{JSON.stringify(connectionState, null, 2)}</p>
      <p>user</p>
      <p>{JSON.stringify(user, null, 2)}</p> */}

      <button
        ref={btnMute}
        style={{
          visibility:
            connectionState == ConnectionStates.connected ||
            connectionState == ConnectionStates.broadcasting
              ? "visible"
              : "hidden",
        }}
      >
        <span>{userMicActive == false ? "Mic Off" : "Mic On"}</span>
      </button>

      <br />
      <br />

      {connectionState == ConnectionStates.connecting && <p>connecting...</p>}

      {connectionState == ConnectionStates.readyToConnect && (
        <>
          <button onClick={() => openTradeRoom()}>openTradeRoom</button>
          <button onClick={() => joinTradeRoom({ roomId: "jingles" })}>
            joinTradeRoom
          </button>
        </>
      )}

      {connected &&
        (connectionState == ConnectionStates.connected ||
          connectionState == ConnectionStates.broadcasting) && (
          <>
            <p>What you ({user.current.userId}) offering:</p>
            {tradeState.usersTrades[user.current.userId] &&
              Object.keys(tradeState.usersTrades[user.current.userId]).map(
                (unit, i) => {
                  return (
                    <button
                      key={i}
                      onClick={() =>
                        updateTradeAsset({
                          asset:
                            tradeState.usersTrades[user.current.userId][unit],
                          quantity: 0,
                        })
                      }
                    >
                      {
                        tradeState.usersTrades[user.current.userId][unit]
                          .assetName
                      }
                    </button>
                  );
                }
              )}

            {Object.keys(tradeState.usersTrades)
              .filter((userId) => userId !== user.current.userId)
              .map((userId, i) => {
                return (
                  <div key={i}>
                    <p>What {userId} is offering:</p>
                    {Object.keys(tradeState.usersTrades[userId]).map(
                      (unit, j) => {
                        return (
                          <p key={j}>
                            {tradeState.usersTrades[userId][unit].assetName}
                          </p>
                        );
                      }
                    )}
                  </div>
                );
              })}

            <p>your assets:</p>

            {walletAssets
              .filter((asset) => asset.assetName.length > 0)
              .map((asset, i) => {
                return (
                  <button
                    key={i}
                    onClick={() =>
                      updateTradeAsset({ asset: asset, quantity: 1 })
                    }
                  >
                    {asset.assetName} ({asset.quantity})
                  </button>
                );
              })}

            <br />
            <br />
            <br />
            <button onClick={() => userAcceptTrade({})}>Accept offer</button>
            {/* <br />
            <br />
            <br />
            <button onClick={() => userAcceptTrade({})}>Sign</button> */}
          </>
        )}
    </>
  );
}
