import { GqlResponse } from "../common";
import Note from "./Note";

type CreateNoteResponse = GqlResponse<{
  createNote: {
    note: Note;
  };
}>;

export default CreateNoteResponse;
