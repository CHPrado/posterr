import { users } from "../helpers/fakedata.db";
import { PostProps, UserProps } from "../interfaces";

const fakeApi = {
  posts() {
    return JSON.parse(
      localStorage.getItem("posterr-posts") as string
    ) as PostProps[];
  },

  async getUserById(userId: number) {
    const user = users.find((user) => user.id === userId) as UserProps;
    return { data: user };
  },

  async getPosts() {
    const posts = this.posts();

    return { data: posts };
  },

  async createPost(text: string, userId: number, postId?: number) {
    const posts = this.posts();
    const id = posts[posts.length - 1].id + 1;

    posts.push({
      id,
      text,
      userId,
      postId,
    });

    localStorage.setItem("posterr-posts", JSON.stringify(posts));
  },

  // ? gets posts from users the logged user follows
  async getFollowingPosts(followingIds: number[]) {
    const posts = this.posts().filter((post) =>
      followingIds.includes(post.userId)
    );

    return { data: posts };
  },
};

export default fakeApi;
