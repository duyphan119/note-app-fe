import Folder from "../folder/Folder";

type Note = {
  id: string;
  content: string;
  folderId: string;
  title: string;
  folder?: Folder;
  createdAt: string;
  updatedAt: string;
};

export default Note;
