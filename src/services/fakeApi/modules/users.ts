import { users as usersData } from "../../../database/fakedata.db";
import { UserProps } from "../../../interfaces";

const users = {
  async getUserById(userId: number) {
    const user = usersData.find((user) => user.id === userId) as UserProps;
    return { data: user };
  },
};

export default users;
