import Head from "next/head";
import dynamic from "next/dynamic";

const RTC = dynamic(() => import("@/components/rtc"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Mesh Trade</title>
        <meta name="description" content="Trade Cardano assets" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <RTC />
      </main>
    </>
  );
}
