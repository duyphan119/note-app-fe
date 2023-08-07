import { GqlResponse } from "../common";

type UpdateNoteResponse = GqlResponse<{
  updateNote: {
    isUpdated: boolean;
  };
}>;

export default UpdateNoteResponse;
