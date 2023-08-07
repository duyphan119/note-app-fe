import { CreateFolderInput, Folder } from "@/types/folder";
import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "./inputs";
import Modal from "./Modal";

type Props = {
  folder?: Folder;
  onClose: () => void;
  onOk: (createFolderInput: CreateFolderInput) => void;
};

const FolderModal: FC<Props> = ({ folder, onClose, onOk }) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<CreateFolderInput>({
    defaultValues: {
      name: folder?.name ?? "",
    },
  });

  const onSubmit: SubmitHandler<CreateFolderInput> = async (
    createFolderInput
  ) => {
    onOk(createFolderInput);
  };

  return (
    <Modal
      onClose={onClose}
      title={folder ? "Edit Folder" : "New Folder"}
      okLoading={isSubmitting}
    >
      <form onSubmit={handleSubmit(onSubmit)} id="form">
        <Input
          register={register("name", {
            required: { value: true, message: "Field name is required" },
          })}
          error={errors.name?.message || ""}
          required={true}
          placeholder="Folder name"
          autoFocus={true}
        />
      </form>
    </Modal>
  );
};

export default FolderModal;
