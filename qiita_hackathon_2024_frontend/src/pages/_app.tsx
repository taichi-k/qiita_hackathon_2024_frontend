import "@/styles/globals.css";
import "@/styles/my.css";
import Header from "@/components/tailblocks/Header"
import Footer from "@/components/tailblocks/Footer"
import type { AppProps } from "next/app";
import { UserProvider } from '../../context/user_context';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Header></Header>
      <Component {...pageProps} />
      <Footer></Footer>
    </UserProvider>
  );
}
