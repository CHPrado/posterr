import { posts as defaultPosts, users } from "../database/fakedata.db";
import { PostProps, UserProps } from "../interfaces";

function useData() {
  function loadPosts(
    setPosts: React.Dispatch<React.SetStateAction<PostProps[]>>
  ) {
    // ? load default posts on localhost
    const currentPosts = JSON.parse(
      localStorage.getItem("posterr-posts") as string
    ) as PostProps[];

    const posts = currentPosts ? currentPosts : defaultPosts;

    localStorage.setItem("posterr-posts", JSON.stringify(posts));
    setPosts(posts);
  }

  // ? set the first user as default logged user on localhost
  function loggin(setUser: React.Dispatch<React.SetStateAction<UserProps>>) {
    let currentUser = JSON.parse(
      localStorage.getItem("posterr-user") as string
    ) as UserProps;

    const user = currentUser ? currentUser : users[0];

    localStorage.setItem("posterr-user", JSON.stringify(user));
    setUser(user);
  }

  return { loadPosts, loggin };
}

export default useData;
