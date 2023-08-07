import { GqlResponse } from "../common";

type RemoveFoldersResponse = GqlResponse<{
  removeFolders: {
    isDeleted: boolean;
  };
}>;

export default RemoveFoldersResponse;
