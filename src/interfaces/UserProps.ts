export interface UserProps {
  id: number;
  name: string;
  username: string;
  avatar: string;
  createdAt: Date;
  followingIds: number[];
  followersIds: number[];
  totalPosts: number;
}
