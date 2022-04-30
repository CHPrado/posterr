import { UserProps } from "../interfaces";
import { posts, users } from "./data.db";

const fakeApi = {
  // ? gets the first user as the default logged user
  async getUser() {
    return users[0];
  },

  async getUserById(userId: number) {
    return users.find((user) => user.id === userId) as UserProps;
  },

  async getPosts() {
    return posts;
  },

  // ? gets posts from users the logged user follows
  async getFollowingPosts(followingIds: number[]) {
    return posts.filter((post) => followingIds.includes(post.userId));
  },
};

export default fakeApi;
