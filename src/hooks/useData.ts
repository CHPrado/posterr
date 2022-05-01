import { posts, users } from "../helpers/fakedata.db";

function useData() {
  function loadPosts() {
    // ? load default posts on localhost
    const currentPosts = JSON.parse(
      localStorage.getItem("posterr-posts") as string
    );

    if (!currentPosts) {
      localStorage.setItem("posterr-posts", JSON.stringify(posts));
    }
  }

  // ? set the first user as default logged user on localhost
  function loggin() {
    const currentUser = JSON.parse(
      localStorage.getItem("posterr-posts") as string
    );

    if (!currentUser) {
      localStorage.setItem("posterr-user", JSON.stringify(users[0]));
    }
  }

  return { loadPosts, loggin };
}

export default useData;
