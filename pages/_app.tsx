import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MeshProvider } from "@meshsdk/react";
import { TradeProvider } from "@/contexts/trade";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MeshProvider>
      <TradeProvider>
        <Component {...pageProps} />
      </TradeProvider>
    </MeshProvider>
  );
}
