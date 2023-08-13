"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BsFillRocketFill } from "react-icons/bs";
import { PiFlame, PiArrowFatLineUpLight } from "react-icons/pi";
import { SiSemanticrelease } from "react-icons/si";

const filtersOption = [
  { value: "best", title: "Best", icon: BsFillRocketFill },
  { value: "hot", title: "Hot", icon: PiFlame },
  { value: "new", title: "New", icon: SiSemanticrelease },
  { value: "top", title: "Top", icon: PiArrowFatLineUpLight },
];

const FiltersSection = () => {
  const [selectedFilter, setSelectedFilter] = useState("best");
  return (
    <div className="w-full p-2 bg-secondary flex items-center gap-2 rounded-md border border-borderPrimary">
      <RadioGroup
        onValueChange={(e) => setSelectedFilter(e)}
        className="flex gap-1 items-center"
        defaultValue="best"
      >
        {filtersOption.map((filter) => {
          return (
            <div key={filter.value} className="flex items-center space-x-2">
              <RadioGroupItem
                className="sr-only"
                value={filter.value}
                id={filter.value}
              />
              <Label
                htmlFor={filter.value}
                className={`${
                  selectedFilter === filter.value
                    ? "bg-slate-700"
                    : "text-mutedText"
                } flex gap-1 rounded-full  items-center py-2 px-3 cursor-pointer`}
              >
                <filter.icon size={18} />
                <span className="font-bold">{filter.title}</span>
              </Label>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default FiltersSection;
