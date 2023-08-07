import { GqlResponse } from "../common";
import Folder from "./Folder";

type CreateFolderResponse = GqlResponse<{
  createFolder: {
    folder: Folder;
  };
}>;

export default CreateFolderResponse;
