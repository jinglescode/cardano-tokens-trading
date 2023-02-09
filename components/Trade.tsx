import AssetCard from "@/components/AssetCard";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useWallet } from "@meshsdk/react";
import { useEffect, useState } from "react";

export default function Trade({ updateTradeAsset, tradeState, user }) {
  return (
    <>
      <div className="h-full pt-20">
        <div className="h-full grid grid-row-2">
          <div className="overflow-auto">
            <div className="h-full grid grid-cols-3">
              <div className="col-span-2 overflow-auto">
                <LeftPane updateTradeAsset={updateTradeAsset} />
              </div>
              <div className="overflow-auto">
                <RightPane
                  updateTradeAsset={updateTradeAsset}
                  tradeState={tradeState}
                  user={user}
                />
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
      const assets = await wallet.getAssets();
      setWalletAssets(assets);
    }
    if (connected && walletAssets.length == 0) {
      loadAssets();
    }
  }, [connected]);

  return (
    <div className="h-full p-2">
      <div className="h-full w-full border border-gray-200 rounded-lg shadow dark:border-gray-700 bg-white/50 backdrop-blur dark:bg-gray-800/50 flex flex-col overflow-auto p-4 gap-4">
        <div className="h-full flex flex-col">
          <div className="flex flex-row">
            <div className="w-full">
              <p className="text-xl font-extrabold text-gray-800">
                Your Inventory
              </p>
            </div>
            <div className="relative w-full m-2">
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
          <div>c</div>
        </div>
      </div>
    </div>
  );
}

function RightPane({ tradeState, updateTradeAsset, user }) {
  const assetsUser = tradeState.usersTrades[user.current.userId]
    ? tradeState.usersTrades[user.current.userId]
    : [];

    console.log("assetsUser", assetsUser)

  return (
    <div className="h-full flex flex-col gap-4 p-2">
      <div className="h-full w-full border border-gray-200 rounded-lg shadow dark:border-gray-700 bg-white/50 backdrop-blur dark:bg-gray-800/50 flex flex-col overflow-auto p-4">
        <div>
          <p className="text-xl font-extrabold text-gray-800">
            What you are offering
          </p>
        </div>
        <div className="overflow-auto">
          <div className="grid grid-cols-3 gap-4 p-4">
            <AssetsGrid assets={assetsUser} updateTradeAsset={updateTradeAsset} />
          </div>
        </div>
      </div>

      <div className="h-full w-full p-6 border border-gray-200 rounded-lg shadow dark:border-gray-700 bg-white/50 backdrop-blur dark:bg-gray-800/50 flex flex-col overflow-auto">
        <div>
          <p className="text-xl font-extrabold text-gray-800">
            What XX is offering
          </p>
        </div>
        <div className="overflow-auto">
          <div className="grid grid-cols-3 gap-4 p-4">
            <AssetsGrid assets={[]} updateTradeAsset={updateTradeAsset} />
          </div>
        </div>
      </div>

      <div className="w-full p-6 border border-gray-200 rounded-lg shadow dark:border-gray-700 bg-white/50 backdrop-blur dark:bg-gray-800/50 flex flex-col">
        <div>
          <button
            type="button"
            className="flex items-center justify-center font-normal text-lg border rounded w-60 px-4 py-2 shadow-sm mx-2 hover:bg-gray-100 md:hover:text-blue-700 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 bg-white"
            // onClick={() => openTradeRoom()}
          >
            Accept Trade
          </button>
        </div>
      </div>
    </div>
  );
}

function AssetsGrid({ assets, updateTradeAsset }) {
  return (
    <>
      {assets.map((asset) => {
        return <AssetCard asset={asset} updateTradeAsset={updateTradeAsset} />;
      })}
      {/* <AssetCard />
      <AssetCard />
      <AssetCard />
      <AssetCard />
      <AssetCard />
      <AssetCard />
      <AssetCard />
      <AssetCard />
      <AssetCard />
      <AssetCard />
      <AssetCard /> */}
    </>
  );
}
