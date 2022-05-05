import { isSameDay } from "date-fns";

import { sortPostsByDateAsc } from "../../../helpers";
import { PostProps } from "../../../interfaces";

const posts = {
  posts() {
    return JSON.parse(
      localStorage.getItem("posterr-posts") as string
    ) as PostProps[];
  },

  async list(filter?: { userIds?: number[]; posted?: Date }) {
    let posts = sortPostsByDateAsc(this.posts());

    if (filter?.userIds) {
      posts = posts.filter((post) => filter.userIds?.includes(post.userId));
    }

    if (filter?.posted) {
      posts = posts.filter((post) =>
        isSameDay(filter.posted!, new Date(post.createdAt))
      );
    }

    return { data: posts };
  },

  async get(id: number) {
    const posts = this.posts();
    const post = posts.find((item) => item.id === id) as PostProps;

    return { data: post };
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
