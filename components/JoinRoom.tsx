import { useTrading } from "@/hooks/useTrading";

export default function JoinRoom() {
  const { openTradeRoom, joinTradeRoom } = useTrading();
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen pt:mt-0">
      <a
        href="#"
        className="flex items-center mb-6 text-2xl font-semibold text-white"
      >
        <img
          className="w-8 h-8 mr-2"
          src="https://meshjs.dev/logo-mesh/white/logo-mesh-white-256x256.png"
          alt="logo"
        />
        Trade
      </a>
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800">
        <div className="p-6 space-y-4 md:space-y-6 lg:space-y-8 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl dark:text-white">
            Create or Join a Trade Room
          </h1>

          <div className="flex flex-row justify-center items-center mx-auto">
            <button
              type="button"
              className="flex items-center justify-center font-normal text-lg border rounded-t-md w-60 px-4 py-2 shadow-sm mx-2 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              onClick={() => openTradeRoom()}
            >
              New Trade Room
            </button>
            <button
              type="button"
              className="flex items-center justify-center font-normal text-lg border rounded-t-md w-60 px-4 py-2 shadow-sm mx-2 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              Join Trade Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
