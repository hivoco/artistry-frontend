import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { SessionProvider } from "./context/SessionContext";
const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider>
      <main className={`inter.className `}>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}
