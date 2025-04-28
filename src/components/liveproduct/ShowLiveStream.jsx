"use client";
import React, { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useRoom } from "@/lib/LiveStreamContext";
import { useRouter } from "next/navigation";

const ShowLiveStream = () => {
  const { roomID } = useRoom();
  const containerRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (roomID) {
      startZegoCloudMeeting(roomID);
    } else {
      router.push("/liveproduct");
    }
  }, [roomID]);

  const startZegoCloudMeeting = async (roomID) => {
    const appID = 102328558;
    const serverSecret = "fcf2a32d937ad44a7da6730d6016dcb2";

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      randomID(5),
      randomID(5)
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: containerRef.current,
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
        config: {
          role: ZegoUIKitPrebuilt.Audience,
        },
      },
    });
  };

  function randomID(len) {
    let result = "";
    const chars =
      "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP";
    const maxPos = chars.length;
    for (let i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }
  return (
    <>
      <div ref={containerRef} className="w-full h-screen myCallContainer"></div>
    </>
  );
};

export default ShowLiveStream;
