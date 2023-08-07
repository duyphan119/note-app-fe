import { FC, memo } from "react";
import { AiOutlineDelete, AiOutlineFileAdd } from "react-icons/ai";

type Props = {
  onDelete: () => void;
  onOpenModal: () => void;
  checkedCount: number;
};

const FolderListHeading: FC<Props> = ({
  onDelete,
  onOpenModal,
  checkedCount,
}) => {
  return (
    <div className="text-white mb-2 flex items-center justify-between">
      Folders
      {checkedCount > 0 ? `(Checked: ${checkedCount})` : ""}
      <div className="flex items-center gap-2">
        {checkedCount > 0 ? (
          <button
            type="button"
            className="text-3xl hover:text-red"
            onClick={onDelete}
            title="Delete Note"
          >
            <AiOutlineDelete />
          </button>
        ) : null}
        <button
          type="button"
          className="text-3xl hover:text-black"
          title="Add Note"
          onClick={() => onOpenModal()}
        >
          <AiOutlineFileAdd />
        </button>
      </div>
    </div>
  );
};

export default memo(FolderListHeading);
