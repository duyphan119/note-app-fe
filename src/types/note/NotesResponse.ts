import { GqlResponse } from "../common";
import Note from "./Note";

type NotesResponse = GqlResponse<{
  notes: {
    notes: Note[];
    count: number;
    totalPages: number;
  };
}>;

export default NotesResponse;
