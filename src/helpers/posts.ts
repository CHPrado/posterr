import { PostProps } from "../interfaces";

export function sortPostsByDateAsc(posts: PostProps[]) {
  return posts?.sort((postA, postB) => {
    const dateA = new Date(postA.createdAt).valueOf();
    const dateB = new Date(postB.createdAt).valueOf();
    return dateB - dateA;
  });
}
