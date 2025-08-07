import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Head from "next/head";
import { SessionProvider } from "../context/SessionContext";
// import { SessionProvider } from "./context/SessionContext";
const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider>
      <Head>
        <title>Artistry Skin Nutrition</title>
        <meta name="description" content="Gaming Quiz for Amway ABOs" />

        <meta property="og:title" content="Artistry Skin Nutrition" />
        <meta property="og:description" content="Gaming Quiz for Amway ABOs" />
        <meta
          property="og:image"
          content="/artistry-logo.png"
        />
        <meta property="og:type" content="website" />
        {/* <meta property="og:url" content="https://yourdomain.com" /> */}
      </Head>

      <main className={`inter.className `}>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}
