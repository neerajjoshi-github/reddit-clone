import Image from "next/image";
import React from "react";

const rules = [
  {
    id: 1,
    rule: "Remember the human",
  },
  {
    id: 2,
    rule: "Behave like you would in real life",
  },
  {
    id: 3,
    rule: "Look for the original source of content",
  },
  {
    id: 4,
    rule: "Search for duplicates before posting",
  },
  {
    id: 5,
    rule: "Read the community’s rules",
  },
];

const PostingRules = () => {
  return (
    <div className="bg-black p-2">
      <div className="flex w-full items-center gap-2">
        <Image
          src="/images/posting-to-reddit.svg"
          width={40}
          height={40}
          alt="Reddit Avatar"
        />
        <p className="font-semibold">Posting to Reddit</p>
      </div>
      <div>
        <ol className="mt-3">
          {rules.map((item, index) => {
            return (
              <li
                className={`${
                  index === 0 && "border-t"
                } py-2 text-sm text-mutedText border-b border-borderPrimary`}
              >
                {item.id}. {item.rule}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default PostingRules;
