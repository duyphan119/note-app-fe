import { CreateNoteInput, Note } from "@/types/note";
import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "./inputs";
import Modal from "./Modal";

type Props = {
  note?: Note;
  onClose: () => void;
  onOk: (createNoteInput: CreateNoteInput) => void;
};

const NoteModal: FC<Props> = ({ note, onClose, onOk }) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<CreateNoteInput>({
    defaultValues: {
      title: note?.title ?? "",
    },
  });

  const onSubmit: SubmitHandler<CreateNoteInput> = async (createNoteInput) => {
    onOk(createNoteInput);
  };

  return (
    <Modal
      onClose={onClose}
      title={note ? "Edit Note" : "New Note"}
      okLoading={isSubmitting}
    >
      <form onSubmit={handleSubmit(onSubmit)} id="form">
        <Input
          register={register("title", {
            required: { value: true, message: "Field title is required" },
          })}
          error={errors.title?.message || ""}
          required={true}
          placeholder="Note title"
          autoFocus={true}
        />
      </form>
    </Modal>
  );
};

export default NoteModal;
