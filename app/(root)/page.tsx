import HomePageSidebar from "@/components/Sidebars/HomePageSidebar";
import CreatePostSection from "@/components/Sections/CreatePostSection";
import SidebarPageLayout from "@/components/Layout/SidebarPageLayout";
import HomePosts from "@/components/Post/HomePosts";

const Home = async () => {
  return (
    <SidebarPageLayout>
      <>
        <CreatePostSection />
        <HomePosts />
      </>
      <>
        <HomePageSidebar />
      </>
    </SidebarPageLayout>
  );
};

export default Home;
