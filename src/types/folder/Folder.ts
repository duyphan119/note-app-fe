import Note from "../note/Note";

type Folder = {
  id: string;
  name: string;
  authorId: string;
  notes: Note[];
  createdAt: string;
  updatedAt: string;
};

export default Folder;
