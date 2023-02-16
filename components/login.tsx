import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { CardanoWallet } from "@meshsdk/react";
import Card from "./Card";

export default function Login() {
  return (
    // <section className="bg-[url('https://flowbite.s3.amazonaws.com/blocks/marketing-ui/authentication/background.jpg')] bg-no-repeat bg-cover bg-center bg-gray-700 bg-blend-multiply bg-opacity-60">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen pt:mt-0">
      <div
        className="flex items-center mb-6 text-2xl font-semibold text-white"
      >
        <img
          className="w-8 h-8 mr-2"
          src="https://meshjs.dev/logo-mesh/white/logo-mesh-white-256x256.png"
          alt="logo"
        />
        Trade
      </div>
      {/* <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800"> */}
      <Card className="sm:max-w-lg">
        <div className="space-y-4 md:space-y-6 lg:space-y-8 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl dark:text-white">
            Connect Wallet to Begin
          </h1>

          <div className="flex flex-col justify-center items-center mx-auto">
            <CardanoWallet />
          </div>
        </div>
      </Card>
      {/* </div> */}
    </div>
    // </section>
  );

  return (
    <main className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col justify-center items-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900">
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="max-w-screen-xl px-4 py-8 mx-auto lg:grid lg:gap-20 lg:py-16 lg:grid-cols-12">
            <div className="flex-col justify-between hidden col-span-6 mr-auto lg:flex xl:mb-0">
              <div>
                <a
                  href="#"
                  className="inline-flex items-center mb-6 text-2xl font-semibold text-gray-900 lg:mb-10 dark:text-white"
                >
                  <img
                    className="w-8 h-8 mr-2"
                    src="https://meshjs.dev/logo-mesh/black/logo-mesh-black-256x256.png"
                    alt="logo"
                  />
                  Trade
                </a>
                <div className="flex">
                  <CheckBadgeIcon className="w-5 h-5 mr-2 text-primary-600 shrink-0" />
                  <div>
                    <h3 className="mb-2 text-xl font-bold leading-none text-gray-900 dark:text-white">
                      Peer to peer
                    </h3>
                    <p className="mb-2 font-light text-gray-500 dark:text-gray-400">
                      Your trade is secure, communication between 2 parties; no
                      backend server and database involved.
                    </p>
                  </div>
                </div>
                <div className="flex pt-8">
                  <CheckBadgeIcon className="w-5 h-5 mr-2 text-primary-600 shrink-0" />
                  <div>
                    <h3 className="mb-2 text-xl font-bold leading-none text-gray-900 dark:text-white">
                      Fast
                    </h3>
                    <p className="mb-2 font-light text-gray-500 dark:text-gray-400">
                      Facilitate trade with a single transaction.
                    </p>
                  </div>
                </div>
              </div>
              <nav>
                <ul className="flex space-x-4">
                  <li>
                    <a
                      href="#"
                      className="text-sm text-gray-500 hover:underline hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-gray-500 hover:underline hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                      Term & Conditions
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-gray-500 hover:underline hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="mb-6 text-center lg:hidden">
              <a
                href="#"
                className="inline-flex items-center text-2xl font-semibold text-gray-900 lg:hidden dark:text-white"
              >
                <img
                  className="w-8 h-8 mr-2"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                  alt="logo"
                />
                Flowbite
              </a>
            </div>
            <div className="w-full col-span-6 mx-auto bg-white rounded-lg shadow dark:bg-gray-800 md:mt-0 sm:max-w-lg xl:p-0">
              <div className="p-6 space-y-4 lg:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 sm:text-2xl dark:text-white">
                  Connect Wallet to Begin
                </h1>
                <div className="items-center space-y-3 sm:space-x-4 sm:space-y-0 sm:flex">
                  <CardanoWallet />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
