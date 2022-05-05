import {
  posts as defaultPosts,
  users as defaultUsers,
} from "../database/fakedata.db";
import { PostProps, UserProps } from "../interfaces";

function useData() {
  // ? set the first user as default logged user on localhost and context
  function loggin(setUser: React.Dispatch<React.SetStateAction<UserProps>>) {
    let currentUser = JSON.parse(
      localStorage.getItem("posterr-user") as string
    ) as UserProps;

    const user = currentUser ? currentUser : defaultUsers[0];

    localStorage.setItem("posterr-user", JSON.stringify(user));
    setUser(user);
  }

  // ? load default users on localhost and context
  function loadUsers(
    setUsers: React.Dispatch<React.SetStateAction<UserProps[]>>
  ) {
    const currentUsers = JSON.parse(
      localStorage.getItem("posterr-users") as string
    ) as UserProps[];

    const users = currentUsers ? currentUsers : defaultUsers;

    localStorage.setItem("posterr-users", JSON.stringify(users));
    setUsers(users);
  }

  // ? load default posts on localhost and context
  function loadPosts(
    setPosts: React.Dispatch<React.SetStateAction<PostProps[]>>
  ) {
    const currentPosts = JSON.parse(
      localStorage.getItem("posterr-posts") as string
    ) as PostProps[];

    const posts = currentPosts ? currentPosts : defaultPosts;

    localStorage.setItem("posterr-posts", JSON.stringify(posts));
    setPosts(posts);
  }

  return { loadPosts, loadUsers, loggin };
}

export default useData;
