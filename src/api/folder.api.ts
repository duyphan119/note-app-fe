import request from "@/utils/request";
import { AxiosResponse } from "axios";
import {
  CreateFolderResponse,
  CreateFolderInput,
  FolderQueryParamsInput,
  FoldersResponse,
  UpdateFolderInput,
  UpdateFolderResponse,
} from "@/types/folder";

export const getFolders = (
  folderQueryParamsInput: FolderQueryParamsInput
): Promise<AxiosResponse<FoldersResponse>> =>
  request(
    `
    query Folders($folderQueryParamsInput: FolderQueryParamsInput!) {
        folders(folderQueryParamsInput: $folderQueryParamsInput) {
            totalPages
            count
            folders {
                id
                name
                createdAt
                notes {
                  id
                }
            }
        }
    }
    `,
    {
      folderQueryParamsInput,
    }
  );

export const addFolder = (
  createFolderInput: CreateFolderInput
): Promise<AxiosResponse<CreateFolderResponse>> =>
  request(
    `
        mutation CreateFolder($createFolderInput: CreateFolderInput!) {
        createFolder(createFolderInput: $createFolderInput) {
            folder {
              id
              name
            }
          }
        }
    `,
    {
      createFolderInput,
    }
  );

export const updateFolder = (
  updateFolderInput: UpdateFolderInput
): Promise<AxiosResponse<UpdateFolderResponse>> =>
  request(
    `
        mutation UpdateFolder($updateFolderInput: UpdateFolderInput!) {
          updateFolder(updateFolderInput: $updateFolderInput) {
            isUpdated
          }
        }
    `,
    {
      updateFolderInput,
    }
  );
export const removeFolders = (idList: string[]) =>
  request(
    `mutation Mutation($idList: [String!]!) {
      removeFolders(idList: $idList) {
        isDeleted
      }
    }`,
    { idList }
  );
