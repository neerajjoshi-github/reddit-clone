import HomePageSidebar from "@/components/Sidebars/HomePageSidebar";
import CreatePostSection from "@/components/Sections/CreatePostSection";
import FiltersSection from "@/components/Sections/FiltersSection";
import SidebarPageLayout from "@/components/Layout/SidebarPageLayout";
import { collection, getDocs } from "firebase/firestore";
import { firestoreDb } from "@/firebase/firebase.config";
import { PostType } from "@/store/PostStore";
import PostItem from "@/components/Post/PostItem";

const fetchPosts = async () => {
  try {
    const postSnapshot = await getDocs(collection(firestoreDb, "posts"));
    const posts = postSnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    return JSON.parse(JSON.stringify(posts)) as PostType[];
  } catch (error) {
    console.log("Error while getting post for home page", error);
  }
};

const Home = async () => {
  const posts = await fetchPosts();

  return (
    <SidebarPageLayout>
      <>
        <CreatePostSection />
        <FiltersSection />
        {posts && posts.map((post) => <PostItem post={post} />)}
      </>
      <>
        <HomePageSidebar />
      </>
    </SidebarPageLayout>
  );
};

export default Home;
