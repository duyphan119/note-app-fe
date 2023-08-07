import { Note } from "@/types/note";
import { FC, ChangeEvent, memo } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import moment from "moment";

type Props = {
  isActive: boolean;
  checked: boolean;
  note: Note;
  onChange: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
  onOpenModal: () => void;
};

const NoteItem: FC<Props> = ({
  isActive,
  checked,
  note,
  onChange,
  onOpenModal,
}) => {
  const { id, title, updatedAt } = note;
  const handleOpen = () => {
    onOpenModal();
  };
  return (
    <li
      className={`flex items-center gap-2 pl-3 ${
        isActive ? "bg-blue text-white" : "bg-white"
      } first:border-none border-t-2 border-t-hr`}
    >
      <input
        type="checkbox"
        className="h-4 w-4"
        checked={checked}
        onChange={(e) => onChange(e, id)}
      />
      <Link to={`notes/${id}`} className={`flex-1 pr-3 block py-3`}>
        <p className="line-clamp-1">{title}</p>
        <p className="text-[10px] line-clamp-1">
          {moment(+updatedAt).format("DD-MM-YYYY HH:mm")}
        </p>
      </Link>
      <button
        title="Edit Folder"
        type="button"
        className="mr-1 text-xl hover:text-orange"
        onClick={handleOpen}
      >
        <AiOutlineEdit />
      </button>
    </li>
  );
};

export default memo(NoteItem);
