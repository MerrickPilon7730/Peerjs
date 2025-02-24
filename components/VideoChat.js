"use client";
import React, { useRef, useState } from "react";
import { usePeer } from "../context/PeerContext";

const VideoChat = () => {
  const { peer, peerId } = usePeer();
  const [remoteId, setRemoteId] = useState("");
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const startCall = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      localVideoRef.current.srcObject = stream;

      const call = peer.call(remoteId, stream);
      call.on("stream", (remoteStream) => {
        remoteVideoRef.current.srcObject = remoteStream;
      });
    });
  };

  const answerCall = () => {
    peer.on("call", (call) => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
        localVideoRef.current.srcObject = stream;
        call.answer(stream);

        call.on("stream", (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream;
        });
      });
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Video Chat</h1>
      <div className="mb-4">
        <p>Your Peer ID: {peerId}</p>
        <input
          type="text"
          placeholder="Enter remote ID"
          value={remoteId}
          onChange={(e) => setRemoteId(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <button onClick={startCall} className="bg-blue-500 text-white p-2 rounded mr-2">
        Start Call
      </button>
      <button onClick={answerCall} className="bg-green-500 text-white p-2 rounded">
        Answer Call
      </button>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <video ref={localVideoRef} autoPlay playsInline muted className="w-full border rounded" />
        <video ref={remoteVideoRef} autoPlay playsInline className="w-full border rounded" />
      </div>
    </div>
  );
};

export default VideoChat;
