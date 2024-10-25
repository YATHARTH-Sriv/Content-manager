"use client"; // Ensures this component is rendered on the client-side

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";

interface GetPlatformProps {
  platform: string;
  setPlatform: (value: string) => void; // Typo corrected: 'setplatform' -> 'setPlatform'
}

export function PlatformSelector({ platform, setPlatform }: GetPlatformProps) {
  return (
    <div className="grid gap-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <Label htmlFor="model" className="text-white">Platform</Label>
        </HoverCardTrigger>
        <HoverCardContent align="start" className="w-[260px] text-sm" side="left">
          Choose the platform you want to generate content for. We provide various options to choose from.
        </HoverCardContent>
      </HoverCard>

      <Select value={platform} onValueChange={setPlatform}> {/* Updates the parent state */}
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a platform" /> {/* Adjusted placeholder */}
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Linkedin">LinkedIn</SelectItem>
          <SelectItem value="Twitter">Twitter</SelectItem>
          <SelectItem value="Hashnode">Hashnode</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
