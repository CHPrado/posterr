import { UserProps } from "./UserProps";

export interface PostProps {
  id: number;
  text?: string;
  userId: number;
  repostId?: number;
  createdAt: Date;
}

export interface PostItem extends PostProps {
  user: UserProps;
  repost?: PostProps;
}
