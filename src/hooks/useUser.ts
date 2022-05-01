import { UserProps } from "../interfaces";

function useUser() {
  function getUser() {
    const user = JSON.parse(
      localStorage.getItem("posterr-user") as string
    ) as UserProps;

    return user;
  }

  return { getUser };
}

export default useUser;
