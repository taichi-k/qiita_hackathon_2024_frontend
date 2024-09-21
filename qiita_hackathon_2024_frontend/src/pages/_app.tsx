import "@/styles/globals.css";
import "@/styles/my.css";
import Header from "@/components/tailblocks/Header"
import Footer from "@/components/tailblocks/Footer"
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header></Header>
      <Component {...pageProps} />
      <Footer></Footer>
    </>
  );
}
