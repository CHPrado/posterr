import { UserProps } from "../../../interfaces";

const users = {
  users() {
    return JSON.parse(
      localStorage.getItem("posterr-users") as string
    ) as UserProps[];
  },

  async update(
    userId: number,
    setUser: React.Dispatch<React.SetStateAction<UserProps>>,
    setUsers: React.Dispatch<React.SetStateAction<UserProps[]>>,
    params: { totalPosts: number }
  ) {
    const users = this.users().map((user) => {
      if (user.id === userId) {
        user.totalPosts = params.totalPosts;
      }

      return user;
    });

    localStorage.setItem("posterr-user", JSON.stringify(users[0]));
    localStorage.setItem("posterr-users", JSON.stringify(users));
    setUser(users[0]);
    setUsers(users);
  },

  async getUserById(userId: number) {
    const users = this.users();

    const user = users.find((user) => user.id === userId) as UserProps;
    return { data: user };
  },

  async followUser(
    userId: number,
    followUserId: number,
    setUser: React.Dispatch<React.SetStateAction<UserProps>>,
    setUsers: React.Dispatch<React.SetStateAction<UserProps[]>>
  ) {
    const users = this.users().map((user) => {
      if (user.id === userId) {
        user.followingIds.push(followUserId);
      }
      if (user.id === followUserId) {
        user.followersIds.push(userId);
      }

      return user;
    });

    localStorage.setItem("posterr-user", JSON.stringify(users[0]));
    localStorage.setItem("posterr-users", JSON.stringify(users));
    setUser(users[0]);
    setUsers(users);
  },

  async unFollowUser(
    userId: number,
    followUserId: number,
    setUser: React.Dispatch<React.SetStateAction<UserProps>>,
    setUsers: React.Dispatch<React.SetStateAction<UserProps[]>>
  ) {
    const users = this.users().map((user) => {
      if (user.id === userId) {
        user.followingIds.map(
          (id, index) => id === followUserId && user.followingIds.splice(index)
        );
      }
      if (user.id === followUserId) {
        user.followersIds.map(
          (id, index) => id === userId && user.followersIds.splice(index)
        );
      }

      return user;
    });

    localStorage.setItem("posterr-user", JSON.stringify(users[0]));
    localStorage.setItem("posterr-users", JSON.stringify(users));
    setUser(users[0]);
    setUsers(users);
  },
};

export default users;
