import { PostItem, PostProps } from "../interfaces";
import { fakeApi } from "../services";

function usePosts() {
  // ? gets all posts and creates a post object with reposts and user
  function createPostList(posts: PostProps[]) {
    const postList: PostItem[] = [];

    posts.forEach((post) => {
      let repost: PostProps;
      if (post.postId) {
        repost = posts.find((item) => item.id === post.postId) as PostProps;
      }

      fakeApi.getUserById(post.userId).then((user) => {
        postList.push({
          ...post,
          user,
          repost,
        });
      });
    });

    return postList;
  }

  return { createPostList };
}

export default usePosts;
