import { addNote, removeNotes, updateNote } from "@/api/note.api";
import { CreateNoteInput, Note, NotesResponse } from "@/types/note";
import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import {
  Outlet,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";
import NoteItem from "./NoteItem";
import NoteListHeading from "./NoteListHeading";
import NoteModal from "./NoteModal";

type Props = {};

const NoteList: FC<Props> = () => {
  const navigate = useNavigate();
  const data = useLoaderData() as NotesResponse;
  const { noteId, folderId } = useParams();
  const [activeId, setActiveId] = useState(noteId || "");
  const [open, setOpen] = useState<boolean>(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [checkedIdList, setCheckedIdList] = useState<string[]>([]);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const handleOpen = useCallback(
    (note?: Note) => {
      folderId && setOpen(true);
      if (note) {
        setCurrentNote(note);
      }
    },
    [folderId]
  );
  const handleClose = useCallback(() => {
    currentNote && setCurrentNote(null);
    setOpen(false);
  }, [currentNote]);

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
    async (createNoteInput: CreateNoteInput) => {
      try {
        if (folderId) {
          if (currentNote) {
            const { data } = await updateNote({
              ...createNoteInput,
              folderId,
              id: currentNote.id,
            });
            console.log("updateNote", data);
            if (data?.data?.updateNote?.isUpdated) {
              setNotes((prevState) =>
                prevState.map((state) =>
                  state.id === currentNote.id
                    ? { ...state, ...createNoteInput }
                    : state
                )
              );
            }
            return;
          }
          const { data } = await addNote({
            ...createNoteInput,
            folderId,
          });
          console.log("createNote:", data);
          if (data?.data?.createNote?.note) {
            const newNote = data.data.createNote.note;
            setNotes((oldNotes) => [newNote, ...oldNotes]);
            navigate(`notes/${newNote.id}`);
          }
        }
      } catch (error) {
      } finally {
        handleClose();
      }
    },
    [folderId, currentNote]
  );

  const handleDelete = useCallback(async () => {
    const isOk = window.confirm("Are you sure?");
    if (isOk) {
      try {
        const { data } = await removeNotes(checkedIdList);
        console.log(data);
        if (data?.data?.removeNotes?.isDeleted) {
          const newNotes = [...notes].filter(
            (item) => !checkedIdList.includes(item.id)
          );
          if (checkedIdList.includes(activeId)) {
            navigate("");
          }
          setNotes(newNotes);
          setCheckedIdList([]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [checkedIdList]);

  useEffect(() => {
    setActiveId(noteId || "");
  }, [noteId]);

  useEffect(() => {
    setNotes(defaultNotes);
  }, [folderId]);

  if (!data) return <></>;

  const {
    data: {
      notes: { notes: defaultNotes },
    },
  } = data;

  const updateTime = (noteId: string) => {
    setNotes((prevState) =>
      prevState.map((item) =>
        item.id === noteId
          ? { ...item, updatedAt: "" + new Date().getTime() }
          : item
      )
    );
  };

  return (
    <div className="grid grid-cols-3 h-full ">
      <div className="col-span-1 h-full">
        <div className="p-2 bg-hr w-full h-[70vh] max-h-[70vh] overflow-y-auto custom-scrollbar">
          <NoteListHeading
            checkedCount={checkedIdList.length}
            onDelete={handleDelete}
            onOpenModal={handleOpen}
          />
          {open ? (
            <NoteModal
              onClose={handleClose}
              onOk={handleOk}
              note={currentNote || undefined}
            />
          ) : null}
          <ul className="flex flex-col">
            {notes.map((note) => {
              const { id } = note;
              return (
                <NoteItem
                  note={note}
                  isActive={activeId === id}
                  checked={checkedIdList.includes(id)}
                  onChange={handleChange}
                  onOpenModal={() => handleOpen(note)}
                  key={id}
                />
              );
            })}
          </ul>
        </div>
      </div>
      <div className="col-span-2 h-full">
        <Outlet context={{ updateTime }} />
      </div>
    </div>
  );
};

export default NoteList;
