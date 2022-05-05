export interface UserProps {
  id: number;
  name: string;
  avatar: string;
  createdAt: Date;
  followingIds: number[];
  followersIds: number[];
}
