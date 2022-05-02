import { PostItem, PostProps } from "../interfaces";
import { fakeApi } from "../services";

function usePosts() {
  // ? gets all posts and creates a post object with reposts and user
  async function createPostList(posts: PostProps[]) {
    const postList: PostItem[] = [];

    posts.forEach(async (post) => {
      let repost: PostProps;
      if (post.postId) {
        repost = posts.find((item) => item.id === post.postId) as PostProps;
      }

      await fakeApi.getUserById(post.userId).then((respose) => {
        postList.push({
          ...post,
          user: respose.data,
          repost,
        });
      });
    });

    return postList;
  }

  return { createPostList };
}

export default usePosts;
