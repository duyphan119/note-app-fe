import { GqlResponse } from "../common";

type RemoveNotesResponse = GqlResponse<{
  removeNotes: {
    isDeleted: boolean;
  };
}>;

export default RemoveNotesResponse;
