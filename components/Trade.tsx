import AssetCard from "@/components/AssetCard";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useWallet } from "@meshsdk/react";
import { useEffect, useState } from "react";
import Button from "./Button";
import Card from "./Card";
import Chat from "./Chat";

export default function Trade({
  updateTradeAsset,
  tradeState,
  user,
  activites,
  sendChatMessage,
}) {
  return (
    <>
      <div className="h-full pt-16">
        <div className="h-full grid grid-row-2">
          <div className="overflow-auto">
            <div className="h-full grid grid-cols-4">
              <div className="overflow-auto">
                <RightPane
                  updateTradeAsset={updateTradeAsset}
                  tradeState={tradeState}
                  user={user}
                />
              </div>
              <div className="col-span-2 overflow-auto">
                <LeftPane updateTradeAsset={updateTradeAsset} />
              </div>
              <div className="overflow-auto">
                <Chat activites={activites} sendChatMessage={sendChatMessage} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function LeftPane({ updateTradeAsset }) {
  const { connected, wallet } = useWallet();
  const [walletAssets, setWalletAssets] = useState([]);

  useEffect(() => {
    async function loadAssets() {
      let assets = await wallet.getAssets();

      assets = assets.filter((asset) => asset.assetName.length > 0);
      setWalletAssets(assets);
    }
    if (connected && walletAssets.length == 0) {
      loadAssets();
    }
  }, [connected]);

  return (
    <div className="h-full p-2">
      <Card className="h-full">
        <div className="h-full flex flex-col">
          <div className="flex flex-row">
            <div className="w-full">
              <p className="text-xl font-extrabold text-gray-800">
                Your Inventory
              </p>
            </div>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Search"
              />
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            <div className="grid grid-cols-6 gap-4 p-4">
              <AssetsGrid
                assets={walletAssets}
                updateTradeAsset={updateTradeAsset}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function RightPane({ tradeState, updateTradeAsset, user }) {
  const assetsUser = tradeState
    ? tradeState.usersTrades[user.current.userId]
      ? Object.keys(tradeState.usersTrades[user.current.userId]).map(
          (unit, i) => {
            return tradeState.usersTrades[user.current.userId][unit];
          }
        )
      : []
    : [];

  const user2UserId = Object.keys(tradeState.usersTrades)
    .filter((userId) => userId !== user.current.userId)
    .map((userId, i) => {
      return userId;
    })[0];

  const assetsUser2 = tradeState
    ? tradeState.usersTrades[user2UserId]
      ? Object.keys(tradeState.usersTrades[user2UserId]).map((unit, i) => {
          return tradeState.usersTrades[user2UserId][unit];
        })
      : []
    : [];

  return (
    <div className="h-full flex flex-col gap-4 p-2">
      <Card className="h-full flex flex-col overflow-auto">
        <div>
          <p className="text-xl font-extrabold text-gray-800">
            What you are offering
          </p>
        </div>
        <div className="overflow-auto">
          <div className="h-full grid grid-cols-3 gap-4 p-4">
            <AssetsGrid
              assets={assetsUser}
              updateTradeAsset={updateTradeAsset}
            />
          </div>
        </div>
      </Card>

      <Card className="h-full flex flex-col overflow-auto">
        <div>
          <p className="text-xl font-extrabold text-gray-800">
            What XX is offering
          </p>
        </div>
        <div className="overflow-auto">
          <div className="grid grid-cols-3 gap-4 p-4">
            <AssetsGrid
              assets={assetsUser2}
              updateTradeAsset={updateTradeAsset}
            />
          </div>
        </div>
      </Card>

      <Card className="flex flex-col">
        <div>
          {/* <Button
          // onClick={() => openTradeRoom()}
          >
            Accept Trade
          </Button> */}
        </div>
      </Card>
    </div>
  );
}

function AssetsGrid({ assets, updateTradeAsset }) {
  return (
    <>
      {assets.map((asset, i) => {
        return (
          <AssetCard
            key={i}
            asset={asset}
            updateTradeAsset={updateTradeAsset}
          />
        );
      })}
    </>
  );
}
