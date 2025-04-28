import { RoomProvider } from "@/lib/LiveStreamContext";

export default function LiveStreamLayout({ children }) {
  return <RoomProvider>{children}</RoomProvider>;
}
