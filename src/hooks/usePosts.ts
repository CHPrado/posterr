import { PostItem, PostProps } from "../interfaces";
import { fakeApi } from "../services";

function usePosts() {
  // ? creates a postItem with user and repost information
  async function createPostItem(post: PostProps) {
    let postItem: PostItem;
    let repost: PostProps | undefined;

    const user = await fakeApi.users
      .getUserById(post.userId)
      .then((response) => response.data);

    if (post.repostId) {
      repost = await fakeApi.posts
        .getPostById(post.repostId)
        .then((response) => response.data);
    }

    postItem = {
      ...post,
      user,
      repost: repost
        ? {
            id: repost?.id,
            text: repost?.text,
            userId: repost?.userId,
            repostId: !post.text ? repost.repostId : undefined,
            createdAt: repost.createdAt,
          }
        : undefined,
    };

    return postItem;
  }

  return { createPostItem };
}

export default usePosts;
