import { Folder } from "../folder";

type Author = {
  id: string;
  uid: string;
  name: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  folders: Folder[];
};

export default Author;
