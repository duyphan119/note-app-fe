import {
  CreateNoteInput,
  CreateNoteResponse,
  NoteQueryParamsInput,
  NoteResponse,
  NotesResponse,
  RemoveNotesResponse,
  UpdateNoteInput,
  UpdateNoteResponse,
} from "@/types/note";
import request from "@/utils/request";
import { AxiosResponse } from "axios";

export const getNotes = (
  noteQueryParamsInput: NoteQueryParamsInput
): Promise<AxiosResponse<NotesResponse>> =>
  request(
    `
    query Notes($noteQueryParamsInput: NoteQueryParamsInput!) {
        notes(noteQueryParamsInput: $noteQueryParamsInput) {
            notes {
                id
                title
                content
                updatedAt
            }
        }
    }
    `,
    {
      noteQueryParamsInput,
    }
  );

export const getNote = (id: string): Promise<AxiosResponse<NoteResponse>> =>
  request(
    `
    query Note($id: String!) {
        note(id: $id) {
            note {
                content
                id
                title
                updatedAt
            }
        }
    }
    `,
    {
      id,
    }
  );

export const addNote = (
  createNoteInput: CreateNoteInput
): Promise<AxiosResponse<CreateNoteResponse>> =>
  request(
    `
        mutation Mutation($createNoteInput: CreateNoteInput!) {
            createNote(createNoteInput: $createNoteInput) {
                note {
                    id
                    title
                    content
                    updatedAt
                }
            }
        }
    `,
    {
      createNoteInput,
    }
  );

export const updateNote = (
  updateNoteInput: UpdateNoteInput
): Promise<AxiosResponse<UpdateNoteResponse>> =>
  request(
    `
    mutation UpdateNote($updateNoteInput: UpdateNoteInput!) {
      updateNote(updateNoteInput: $updateNoteInput) {
        isUpdated
      }
    }
    `,
    {
      updateNoteInput,
    }
  );

export const removeNotes = (
  idList: string[]
): Promise<AxiosResponse<RemoveNotesResponse>> =>
  request(
    `mutation Mutation($idList: [String!]!) {
        removeNotes(idList: $idList) {
          isDeleted
        }
      }`,
    { idList }
  );
