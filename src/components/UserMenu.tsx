import { AuthContext } from "@/context";
import { FC, useContext } from "react";
import Notification from "./Notification";

type Props = {};

const UserMenu: FC<Props> = () => {
  const {
    user: { name, avatar },
    auth,
  } = useContext(AuthContext);
  const handleLogout = () => {
    auth.signOut();
  };
  return (
    <div className="flex justify-end items-center relative mb-3 gap-3">
      <button
        onClick={handleLogout}
        type="button"
        className="px-4 py-1 rounded-sm bg-blue text-white select-none"
      >
        Logout
      </button>
      <span className="select-none ">{name}</span>
      <img
        src={avatar}
        alt="avatar"
        className="h-10 w-10 object-cover rounded-[50%]"
      />
      <Notification />
    </div>
  );
};

export default UserMenu;
