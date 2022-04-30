import { UserProps } from "./UserProps";

export interface PostProps {
  id: number;
  text?: string;
  userId: number;
  postId?: number;
}

export interface PostItem extends PostProps {
  user: UserProps;
  repost?: PostProps;
}
