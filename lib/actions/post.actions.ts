import { firestoreDb, storage } from "@/firebase/firebase.config";
import { PostType } from "@/store/PostStore";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

export const deletePost = async (post: PostType): Promise<boolean> => {
  try {
    if (post?.imageURL) {
      const imageRef = ref(storage, `posts/${post.id}/image`);
      await deleteObject(imageRef);
    }
    console.log("FUNCTION INSIDE");
    const postDocRef = doc(firestoreDb, "posts", post.id);
    await deleteDoc(postDocRef);
    return true;
  } catch (error) {
    console.log("Error while deleting a post!!", error);
    return false;
  }
};
