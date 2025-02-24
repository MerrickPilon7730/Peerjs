"use client";

import { PeerProvider } from "../context/PeerContext";

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  return <PeerProvider>{children}</PeerProvider>;
}
