"use client";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import Peer from "peerjs";

const PeerContext = createContext();

export const usePeer = () => useContext(PeerContext);

export const PeerProvider = ({ children }) => {
  const [peerId, setPeerId] = useState(null);
  const peerInstance = useRef(null);

  useEffect(() => {
    //const peer = new Peer(getPeerId());
    const peer = new Peer("2001", {
        debug: 3
    });

    //get peer id from database then call it in constructor
    /*const getPeerId = () => {
        //instead of local storage find the peerId from the database
        let id = localStorage.getItem("peerId");
        if (!id) {
        //can use a base int then increment
          id = Math.random().toString(36).substring(2, 12); 
          localStorage.setItem("peerId", id);
        }
        return id;
      };*/

    peer.on("open", (id) => {
      setPeerId(id);
    });

    peer.on("error", (err) => {
      console.error("PeerJS Error:", err);
    });

    peerInstance.current = peer;

    return () => {
      peer.destroy();
    };
  }, []);

  return (
    <PeerContext.Provider value={{ peer: peerInstance.current, peerId }}>
      {children}
    </PeerContext.Provider>
  );
};
