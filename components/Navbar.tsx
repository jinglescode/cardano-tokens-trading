import { SpeakerWaveIcon } from "@heroicons/react/24/solid";
import { ConnectionStates } from "@/types/connectionStates";

export default function Navbar({ btnMute, userMicActive, connectionState }) {
  return (
    <nav className="border-gray-200 px-4 lg:px-6 py-2.5 fixed z-30 w-full border-b dark:border-gray-700 bg-white/80 backdrop-blur dark:bg-gray-800/80">
      <div className="flex flex-wrap items-center justify-between mx-auto">
        <div className="flex items-center">
          <img
            src="https://meshjs.dev/logo-mesh/black/logo-mesh-black-256x256.png"
            className="h-6 mr-3 sm:h-9"
            alt="Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Trade
          </span>
        </div>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col p-2 mt-1 md:flex-row md:mt-0">
            {/* <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                About
              </a>
            </li> */}

            <div
            // style={{
            //   visibility:
            //     connectionState == ConnectionStates.connected ||
            //     connectionState == ConnectionStates.broadcasting
            //       ? "visible"
            //       : "hidden",
            // }}
            >
              {/* <button
                className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none rounded-lg text-sm bg-white p-2"
                ref={btnMute}
              >
                <SpeakerWaveIcon className="w-4 h-4" />
              </button> */}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}
