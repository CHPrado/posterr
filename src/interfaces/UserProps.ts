export interface UserProps {
  id: number;
  name: string;
  avatar: string;
  followingIds: number[] | [];
  followersIds: number[] | [];
}
