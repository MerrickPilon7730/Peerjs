"use client";
import "../styles/globals.css";
import { PeerProvider } from "../context/PeerContext";

function MyApp({ Component, pageProps }) {
  return (
    <PeerProvider>
      <Component {...pageProps} />
    </PeerProvider>
  );
}

export default MyApp;
