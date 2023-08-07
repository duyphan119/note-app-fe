import { GqlResponse } from "../common";
import Note from "./Note";

type NoteResponse = GqlResponse<{
  note: {
    note: Note;
  };
}>;

export default NoteResponse;
