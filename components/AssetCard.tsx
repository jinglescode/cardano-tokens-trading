export default function AssetCard({ asset, updateTradeAsset }) {
  return (
    <button onClick={() => updateTradeAsset({ asset: asset, quantity: 1 })}>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img
          className="rounded-t-lg"
          src="https://meshjs.dev/logo-mesh/mesh.png"
          alt=""
        />
        <div className="p-2">
          <p className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
            {asset.assetName}
          </p>
        </div>
      </div>
    </button>
  );
}
