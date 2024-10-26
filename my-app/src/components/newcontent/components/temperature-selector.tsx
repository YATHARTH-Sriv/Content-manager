"use client";

import * as React from "react";
import { SliderProps } from "@radix-ui/react-slider";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface TemperatureSelectorProps {
  temperature: number; // The current temperature value passed from parent
  setTemperature: (value: number) => void; // Function to update temperature in parent
}

export function TemperatureSelector({ temperature, setTemperature }: TemperatureSelectorProps) {
  return (
    <div className="grid gap-2 pt-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="temperature" className="text-white">Randomness</Label>
              <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border text-white">
                {temperature.toFixed(1)} {/* Display the value with 1 decimal precision */}
              </span>
            </div>
            <Slider
              id="temperature"
              max={1}
              step={0.1}
              value={[temperature]} // Controlled by parent component
              onValueChange={(value) => setTemperature(value[0])} // Update the parent state
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4 "
              aria-label="Temperature"
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          Controls randomness: lowering results in less random completions. As
          the temperature approaches zero, the model will become deterministic
          and repetitive.
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
