import { addFolder, removeFolders, updateFolder } from "@/api/folder.api";
import { CreateFolderInput, Folder } from "@/types/folder";
import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FolderItem from "./FolderItem";
import FolderListHeading from "./FolderListHeading";
import FolderModal from "./FolderModal";

type Props = {
  folders: Folder[];
};

const FolderList: FC<Props> = ({ folders: defaultFolders }) => {
  const navigate = useNavigate();
  const { folderId } = useParams();
  const [folders, setFolders] = useState<Folder[]>(defaultFolders);
  const [activeId, setActiveId] = useState<string>(folderId || "");
  const [open, setOpen] = useState<boolean>(false);
  const [checkedIdList, setCheckedIdList] = useState<string[]>([]);
  const [currentFolder, setCurrentFolder] = useState<Folder | null>(null);
  const handleOpen = useCallback((folder?: Folder) => {
    folder && setCurrentFolder(folder);
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    currentFolder && setCurrentFolder(null);
    setOpen(false);
  }, []);
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, id: string) => {
      const { checked } = e.target;

      if (checked) {
        setCheckedIdList((prevState) => [...prevState, id]);
      } else {
        setCheckedIdList((prevState) =>
          prevState.filter((item) => item !== id)
        );
      }
    },
    []
  );
  const handleOk = useCallback(
    async (createFolderInput: CreateFolderInput) => {
      try {
        if (currentFolder) {
          console.log(currentFolder);
          const { data } = await updateFolder({
            ...createFolderInput,
            id: currentFolder.id,
          });
          console.log("updateFolder", data);
          if (data?.data?.updateFolder?.isUpdated) {
            setFolders((oldFolders) =>
              oldFolders.map((item) =>
                item.id === currentFolder.id
                  ? { ...item, ...createFolderInput }
                  : item
              )
            );
          }
          return;
        }
        const { data } = await addFolder(createFolderInput);
        console.log("createFolder", data);
        if (data?.data?.createFolder?.folder) {
          const newFolder = data.data.createFolder.folder;
          setFolders((oldFolders) => [newFolder, ...oldFolders]);
          navigate(`folders/${newFolder.id}`);
        }
      } catch (error) {
      } finally {
        handleClose();
      }
    },
    [currentFolder]
  );
  const handleDelete = useCallback(async () => {
    const isOk = window.confirm("Are you sure?");
    if (isOk) {
      try {
        const { data } = await removeFolders(checkedIdList);
        console.log(data);
        if (data?.data?.removeFolders?.isDeleted) {
          const newFolder = [...folders].filter(
            (item) => !checkedIdList.includes(item.id)
          );
          if (checkedIdList.includes(activeId)) {
            navigate("");
          }
          setFolders(newFolder);
          setCheckedIdList([]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [checkedIdList]);
  useEffect(() => {
    setActiveId(folderId || "");
  }, [folderId]);
  return (
    <div className="h-[70vh] max-h-[70vh] overflow-y-auto custom-scrollbar bg-teal p-2 ">
      <FolderListHeading
        onDelete={handleDelete}
        onOpenModal={handleOpen}
        checkedCount={checkedIdList.length}
      />
      {open ? (
        <FolderModal
          onClose={handleClose}
          onOk={handleOk}
          folder={currentFolder || undefined}
        />
      ) : null}
      <ul className="flex flex-col">
        {folders.map((folder) => {
          const { id } = folder;
          return (
            <FolderItem
              key={id}
              folder={folder}
              isActive={activeId === id}
              checked={checkedIdList.includes(id)}
              onChange={handleChange}
              onOpenModal={() => handleOpen(folder)}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default FolderList;
