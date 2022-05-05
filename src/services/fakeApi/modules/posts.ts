import { sortPostsByDateAsc } from "../../../helpers";
import { PostProps } from "../../../interfaces";

const posts = {
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

  // ? gets posts from multiple users
  async getPostsFromUsers(userIds: number[]) {
    const posts = sortPostsByDateAsc(this.posts()).filter((post) =>
      userIds.includes(post.userId)
    );

    return { data: posts };
  },

  async create(
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
      createdAt: new Date(),
    });

    localStorage.setItem("posterr-posts", JSON.stringify(posts));
    setPosts(sortPostsByDateAsc(posts));
  },
};

export default posts;
