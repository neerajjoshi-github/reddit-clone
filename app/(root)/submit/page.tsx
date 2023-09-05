import CreatePost from "@/components/Post/CreatePost";
import PostingRules from "@/components/Sidebars/PostingRules";
import SidebarPageLayout from "@/components/Layout/SidebarPageLayout";

const page = () => {
  return (
    <SidebarPageLayout>
      <CreatePost />
      <PostingRules />
    </SidebarPageLayout>
  );
};

export default page;
