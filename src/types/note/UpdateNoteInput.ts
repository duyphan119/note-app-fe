import CreateNoteInput from "./CreateNoteInput";

type UpdateNoteInput = {
  id: string;
} & Partial<CreateNoteInput>;

export default UpdateNoteInput;
