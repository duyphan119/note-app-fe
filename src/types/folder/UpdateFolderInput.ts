import CreateFolderInput from "./CreateFolderInput";

type UpdateFolderInput = {
  id: string;
} & Partial<CreateFolderInput>;

export default UpdateFolderInput;
