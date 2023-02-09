import AssetCard from "@/components/AssetCard";

export default function Trade() {
  return (
    <>
      <div className="h-full pt-20">
        <div className="h-full grid grid-row-2">

          <div className="overflow-auto">
            <div className="h-full grid grid-cols-3">
              <div className="col-span-2 overflow-auto">
                <LeftPane />
              </div>
              <div className="overflow-auto">
                <RightPane />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function LeftPane() {
  return (
    <div className="h-full flex flex-col">
      <div>a</div>
      <div className="overflow-auto">
        <Sect />
      </div>
      <div>c</div>
    </div>
  );
}

function RightPane() {
  return (
    <div className="h-full flex flex-col">
      <div>
        <p>What you offering</p>
      </div>
      <div className="overflow-auto">
        <Sect />
      </div>
      <div>
        <p>What XX offering</p>
      </div>
      <div className="overflow-auto">
        <Sect />
      </div>
    </div>
  );
}

function Sect() {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
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
  );
}
