import { FC, memo } from "react";
import { AiOutlineDelete, AiOutlineFileAdd } from "react-icons/ai";

type Props = {
  checkedCount: number;
  onDelete: () => void;
  onOpenModal: () => void;
};

const NoteListHeading: FC<Props> = ({
  checkedCount,
  onDelete,
  onOpenModal,
}) => {
  return (
    <div className="mb-2 flex items-center justify-between">
      Notes {checkedCount > 0 ? `(Checked: ${checkedCount})` : ""}
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
          className="text-3xl hover:text-blue"
          title="Add Note"
          onClick={() => onOpenModal()}
        >
          <AiOutlineFileAdd />
        </button>
      </div>
    </div>
  );
};

export default memo(NoteListHeading);
