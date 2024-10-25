// app/components/TweetViewer.tsx
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface TweetViewerProps {
  content: string;
  username: string;
  timestamp: string;
}

export function TweetViewer({ content, username, timestamp }: TweetViewerProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">View Your Tweet</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Tweet Preview</DialogTitle>
          <DialogDescription>
            Here’s how your tweet will look:
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 border border-gray-300 rounded-md shadow-md">
          <div className="font-bold text-gray-800">{username}</div>
          <div className="text-gray-600 text-sm">{timestamp}</div>
          <div className="mt-2 text-gray-900">{content}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
