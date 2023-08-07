import { Folder } from "@/types/folder";
import { FC, ChangeEvent, memo } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";

type Props = {
  folder: Folder;
  isActive: boolean;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
  onOpenModal: () => void;
};

const FolderItem: FC<Props> = ({
  folder,
  isActive,
  checked,
  onChange,
  onOpenModal,
}) => {
  const { id, name } = folder;
  return (
    <li
      className={`flex items-center gap-2 pl-3 ${
        isActive ? "bg-darkpink text-white" : "bg-white"
      } first:border-none border-t-2 border-t-teal`}
    >
      <input
        type="checkbox"
        className="h-4 w-4"
        checked={checked}
        onChange={(e) => onChange(e, id)}
      />
      <Link to={`folders/${id}`} className={`flex-1 block py-3 line-clamp-1`}>
        {name}
      </Link>
      <button
        title="Edit Folder"
        type="button"
        className="mr-1 text-xl hover:text-teal"
        onClick={() => onOpenModal()}
      >
        <AiOutlineEdit />
      </button>
    </li>
  );
};

export default memo(FolderItem);
