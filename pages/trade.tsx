import AssetCard from "@/components/AssetCard";

export default function Trade() {
  return (
    <div className="h-screen">
      <div className="h-full grid grid-cols-3 gap-4">
        <div className="col-span-2">04</div>

        <div className="h-full grid grid-rows-2 gap-4">
          <div className="grid grid-cols-3 gap-4 max-h-full	overflow-y-auto">
            <AssetCard />
            <AssetCard />
            <AssetCard />
            <AssetCard />
            <AssetCard />
            <AssetCard />
            <AssetCard />
            <AssetCard />
            <AssetCard />
            <AssetCard />
            <AssetCard />
          </div>
          <div>what you get</div>
        </div>
      </div>
    </div>
  );
}
