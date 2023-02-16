import Card from "./Card";

export default function Connecting() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen pt:mt-0">
      <div className="flex items-center mb-6 text-2xl font-semibold text-white">
        <img
          className="w-8 h-8 mr-2"
          src="https://meshjs.dev/logo-mesh/white/logo-mesh-white-256x256.png"
          alt="logo"
        />
        Trade
      </div>
      {/* <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800"> */}
      <Card className="sm:max-w-lg">
        <div className="p-6 space-y-4 md:space-y-6 lg:space-y-8 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl dark:text-white">
            Create or Join a Trade Room
          </h1>

          <div className="flex flex-row justify-center items-center mx-auto">
            <p>Connecting...</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
