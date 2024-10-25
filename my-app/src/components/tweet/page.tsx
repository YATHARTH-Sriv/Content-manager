import { useSession } from "next-auth/react";
import { TweetViewer } from "../newcontent/components/tweet-preview";

interface TweetViewerProps {
    content: string;
  }

export default function TweetPreviewPage({content}:TweetViewerProps) {
//   const tweetContent = "Excited to share my latest project! #Web3 #Development";
      let newcontent=content.replace(/^"|"$|/g, '')
      newcontent=newcontent.replace("<br />", '')
  const timestamp = "0s ago";
  const {data:session}=useSession()

  return (
    <div className="flex items-center justify-center min-h-screen">
      {session && <TweetViewer content={newcontent} username={session.user.name} timestamp={timestamp} />}
    </div>
  );
}
