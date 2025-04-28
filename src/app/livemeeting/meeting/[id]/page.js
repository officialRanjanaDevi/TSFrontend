import { notFound } from "next/navigation";
import ZoomMeeting from "@/components/liveVideo/ZoomMeeting";
import axios from "axios";

const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;

async function fetchMeeting(meetingId) {
  try {
    const res = await axios.get(`${serverURL}/api/v1/meeting/${meetingId}`);
    console.log(res,"here it is")
    return res.data; 
  } catch (err) {
    return null;
  }
}

// ✅ This is a Server Component in Next.js 13+
const JoinMeeting = async ({ params }) => {
  const tournament = await fetchMeeting(params.id);

  if (!tournament) {
    notFound();
  }

  return (
    <ZoomMeeting
      meetTitle={tournament.title}
      meetZoomId={tournament.zoom_meeting_id}
      meetZoomPass={tournament.zoom_meeting_password}
      meetId={tournament._id}
      meetStatus={tournament.status}
    />
  );
};

export default JoinMeeting;
