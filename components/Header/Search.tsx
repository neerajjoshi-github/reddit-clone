"use client";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Input } from "../ui/input";
import {
  collection,
  doc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { firestoreDb } from "@/firebase/firebase.config";
import { Community } from "@/store/communityStore";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const fetchSearch = async (searchString: string) => {
  try {
    const communityRef = collection(firestoreDb, "communities");
    const searchQuery = query(
      communityRef,
      where("name", ">=", searchString),
      where("name", "<", searchString + "z"),
      limit(10)
    );
    const querySnapshot = await getDocs(searchQuery);
    const communities = querySnapshot.docs.map((doc) => {
      return doc.data();
    });

    return communities as Community[];
  } catch (error) {
    console.log("Error while searching... : ", error);
    return [];
  }
};

type SearchProps = {
  className?: string;
};

const Search: React.FC<SearchProps> = ({ className }) => {
  const [results, setResults] = useState<Community[] | null>(null);
  const searchHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const communities = await fetchSearch(e.target.value);
    setResults(communities);
  };

  useEffect(() => {
    const fethcCommunities = async () => {
      const communities = await fetchSearch("");
      setResults(communities);
    };

    fethcCommunities();
  }, []);

  return (
    <div
      className={cn(
        `focus-within:rounded-t-3xl focus-within:rounded-b-none rounded-full relative flex items-center py-2 px-3 bg-[#1a282d] hover:brightness-110 max-w-[750px] flex-1`,
        className
      )}
    >
      <BsSearch size={18} />
      <Input
        onChange={searchHandler}
        placeholder="Search Reddit"
        className="peer h-6 bg-transparent border-none"
      />

      <div className="peer-focus:flex hidden flex-col p-2 absolute top-10 left-0 w-full min-h-[80px] bg-[#1a282d] border-t border-borderPrimary">
        {results ? (
          results.length !== 0 ? (
            results.map((community, index) => {
              return (
                <Link
                  key={community.id}
                  href={`/r/${community.name}`}
                  className={`${
                    index !== 0 && "border-t border-borderPrimary"
                  } flex items-center gap-2 hover:bg-background cursor-pointer px-2 py-3 rounded-md`}
                >
                  <div className="relative w-8 h-8 rounded-full">
                    <Image
                      src={
                        community.imageUrl || "/images/redditPersonalHome.png"
                      }
                      fill
                      alt="Community Profile Image"
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-sm">r/{community.name}</h4>
                    <p className="text-xs text-mutedText">
                      {community.numberOfMembers} members
                    </p>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="text-mutedText text-sm text-center">
              No results found....
            </div>
          )
        ) : (
          <div className="text-mutedText text-sm text-center">Loding.....</div>
        )}
      </div>
    </div>
  );
};

export default Search;
