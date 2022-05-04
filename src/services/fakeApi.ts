import { users } from "../database/fakedata.db";
import { sortPostsByDateAsc } from "../helpers";
import { PostProps, UserProps } from "../interfaces";

const fakeApi = {
  posts() {
    return JSON.parse(
      localStorage.getItem("posterr-posts") as string
    ) as PostProps[];
  },

  async getPosts() {
    const posts = sortPostsByDateAsc(this.posts());

    return { data: posts };
  },

  async getPostById(id: number) {
    const posts = this.posts();
    const post = posts.find((item) => item.id === id) as PostProps;

    return { data: post };
  },

  // ? gets posts from users the logged user follows
  async getFollowingPosts(followingIds: number[]) {
    const posts = sortPostsByDateAsc(this.posts()).filter((post) =>
      followingIds.includes(post.userId)
    );

    return { data: posts };
  },

  async createPost(
    userId: number,
    setPosts: React.Dispatch<React.SetStateAction<PostProps[]>>,
    text?: string,
    repostId?: number
  ) {
    const posts = this.posts();
    const id = posts[posts.length - 1].id + 1;

    posts.push({
      id,
      text,
      userId,
      repostId,
    });

    localStorage.setItem("posterr-posts", JSON.stringify(posts));
    setPosts(sortPostsByDateAsc(posts));
  },

  async getUserById(userId: number) {
    const user = users.find((user) => user.id === userId) as UserProps;
    return { data: user };
  },
};

export default fakeApi;
