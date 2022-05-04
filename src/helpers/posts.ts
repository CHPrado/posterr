import { PostProps } from "../interfaces";

export function sortPostsByDateAsc(posts: PostProps[]) {
  // TODO update id to date when implemented
  return posts?.sort((a, b) => b.id - a.id);
}
