import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserPosts from "@/components/User/UserPosts";
import UserComments from "@/components/User/UserComments";
import UserCommunities from "@/components/User/UserCommunities";

const UserProfilePage = ({ params }: { params: { userId: string } }) => {
  return (
    <Tabs defaultValue="posts">
      <TabsList className="w-full bg-transparent">
        <TabsTrigger value="posts">Posts</TabsTrigger>
        <TabsTrigger value="commnets">Comments</TabsTrigger>
        <TabsTrigger value="communities">Communities</TabsTrigger>
      </TabsList>
      <TabsContent value="posts">
        <UserPosts userId={params.userId} />
      </TabsContent>
      <TabsContent value="commnets">
        <UserComments userId={params.userId} />
      </TabsContent>
      <TabsContent value="communities">
        <UserCommunities userId={params.userId} />
      </TabsContent>
    </Tabs>
  );
};

export default UserProfilePage;
