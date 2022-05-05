import { UserProps } from "../../../interfaces";

const users = {
  users() {
    return JSON.parse(
      localStorage.getItem("posterr-users") as string
    ) as UserProps[];
  },

  async getUserById(userId: number) {
    const posts = this.users();

    const user = posts.find((user) => user.id === userId) as UserProps;
    return { data: user };
  },
};

export default users;
