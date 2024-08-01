import React, { useEffect, useRef } from "react";
import "./App.css";

function App() {
  const localStreamRef = useRef(null);
  const remoteStreamRef = useRef(null);
  let servers = {
    iceServers: [
      {
        urls: ["stun.l.google.com:19302", "stun1.l.google.com:19302"],
      },
    ],
  };
  useEffect(() => {
    let localStream;
    let remoteStream;
    const initCamera = async () => {
      try {
        localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        console.log(localStream);
        localStreamRef.current.srcObject = localStream;
        createOffer();
      } catch (error) {
        console.error("Error accessing media devices.", error);
      }
    };
    const createOffer = async () => {
      const peerConnection = new RTCPeerConnection();
      const remoteStream = new MediaStream();
      remoteStreamRef.current.srcObject = remoteStream;
      console.log(localStream);
      localStream.getTracks().forEach((track) => {
        console.log(track);
        peerConnection.addTrack(track, localStream);
      });
      peerConnection.ontrack = (e) => {
        e.streams[0].getTracks().forEach((track) => {
          remoteStream.addTrack(track);
        });
      };
      peerConnection.onicecandidate = async (e) => {
        if (e.candidate) {
          console.log("new ice candidate", e.candidate);
        }
      };
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      console.log("offer:", offer);
    };
    initCamera();
  }, []);

  return (
    <div className="App h-screen w-screen flex flex-col items-center justify-center text-white bg-slate-800">
      <div className="flex flex-col">
        <h1>You</h1>
        <video
          ref={localStreamRef}
          autoPlay
          playsInline
          className="video-player border-2 h-96 w-96"
        />
      </div>
      <div className="flex flex-col">
        <h1>Other</h1>
        <video
          ref={remoteStreamRef}
          autoPlay
          playsInline
          className="video-player border-2 h-96 w-96"
        />
      </div>
    </div>
  );
}

export default App;
