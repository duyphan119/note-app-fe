import { GqlResponse } from "../common";

type UpdateFolderResponse = GqlResponse<{
  updateFolder: {
    isUpdated: boolean;
  };
}>;

export default UpdateFolderResponse;
