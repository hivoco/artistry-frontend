import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { SessionProvider } from "./context/SessionContext";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider>
      <Head>
        <title>Artistry Skin Nutrition</title>
        <meta name="description" content="Gaming Quiz for Amway ABOs" />
      </Head>

      <main className={`inter.className `}>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}
