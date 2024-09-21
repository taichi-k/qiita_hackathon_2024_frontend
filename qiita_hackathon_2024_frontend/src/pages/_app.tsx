import "@/styles/globals.css";
import "@/styles/my.css";
import Footer from "@/components/tailblocks/Footer"
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Footer></Footer>
    </>
  );
}
