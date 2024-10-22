"use client"; // Ensures this component is rendered on the client-side

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";

interface GetCategoryProps {
  category: string;
  setCategory: (value: string) => void; 
}

export function CategorySelector({ category, setCategory }: GetCategoryProps) {
  return (
    <div className="grid gap-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <Label htmlFor="model" className="text-white">Category</Label>
        </HoverCardTrigger>
        <HoverCardContent align="start" className="w-[260px] text-sm" side="left">
          Choose the category you want to generate content for. We provide various options to choose from.
        </HoverCardContent>
      </HoverCard>

      <Select value={category} onValueChange={setCategory}> {/* Updates the parent state */}
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a category" /> {/* Adjusted placeholder */}
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="tech">tech</SelectItem>
          <SelectItem value="fashion">fashion</SelectItem>
          <SelectItem value="buisness">Buisness</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
