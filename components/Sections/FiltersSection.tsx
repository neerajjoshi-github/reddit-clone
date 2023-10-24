"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BsFillRocketFill } from "react-icons/bs";
import { PiFlame, PiArrowFatLineUpLight } from "react-icons/pi";
import { SiSemanticrelease } from "react-icons/si";

const filtersOption = [
  { value: "title", title: "Best", icon: BsFillRocketFill },
  { value: "numberOfComments", title: "Hot", icon: PiFlame },
  { value: "createdAt", title: "New", icon: SiSemanticrelease },
  { value: "voteStatus", title: "Top", icon: PiArrowFatLineUpLight },
];

type FiltersSectionProps = {
  selectedFilter: string;
  setSelectedFilter: (value: string) => void;
};

const FiltersSection: React.FC<FiltersSectionProps> = ({
  selectedFilter,
  setSelectedFilter,
}) => {
  return (
    <div className="w-full py-2 flex items-center max-xs:justify-center  rounded-md border border-borderPrimary">
      <RadioGroup
        onValueChange={(e) => setSelectedFilter(e)}
        className="flex gap-1 items-center"
        defaultValue="best"
      >
        {filtersOption.map((filter) => {
          return (
            <div
              key={filter.value}
              className="flex w-full items-center space-x-1 xs:space-x-2"
            >
              <RadioGroupItem
                className="sr-only"
                value={filter.value}
                id={filter.value}
              />
              <Label
                htmlFor={filter.value}
                className={`${
                  selectedFilter === filter.value
                    ? "bg-secondary"
                    : "text-mutedText"
                } flex gap-1 rounded-full items-center py-2 px-3 cursor-pointer hover:bg-secondary transition duration-200`}
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
