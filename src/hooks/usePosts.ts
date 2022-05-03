import { PostItem, PostProps } from "../interfaces";
import { fakeApi } from "../services";

function usePosts() {
  function sortPostsByDateAsc(posts: PostProps[]) {
    // TODO update id to date when implemented
    return posts.sort((a, b) => b.id - a.id);
  }

  // ? creates a postItem with user and repost information
  async function createPostItem(post: PostProps) {
    let postItem: PostItem;
    let repost: PostProps | undefined;

    const user = await fakeApi
      .getUserById(post.userId)
      .then((response) => response.data);

    if (post.repostId) {
      repost = await fakeApi
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
          }
        : undefined,
    };

    return postItem;
  }

  return { createPostItem, sortPostsByDateAsc };
}

export default usePosts;
