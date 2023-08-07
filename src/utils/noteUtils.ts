import { getNote, getNotes } from "@/api/note.api";
import { NoteResponse, NotesResponse } from "@/types/note";
import { LoaderFunctionArgs } from "react-router-dom";

export const notesLoader = async ({
  params: { folderId },
}: LoaderFunctionArgs): Promise<NotesResponse | null> => {
  try {
    if (folderId) {
      const { data } = await getNotes({
        sortBy: "createdAt",
        sortType: "desc",
        folderId,
      });
      return data;
    }
  } catch (error) {}
  return null;
};

export const noteLoader = async ({
  params: { noteId },
}: LoaderFunctionArgs): Promise<NoteResponse | null> => {
  try {
    if (noteId) {
      const { data } = await getNote(noteId);
      return data;
    }
  } catch (error) {}
  return null;
};
