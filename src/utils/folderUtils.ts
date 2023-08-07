import { getFolders } from "@/api/folder.api";
import FoldersResponse from "@/types/folder/FoldersResponse";
import { LoaderFunctionArgs } from "react-router-dom";

export const foldersLoader = async (
  _: LoaderFunctionArgs
): Promise<FoldersResponse | null> => {
  try {
    const { data } = await getFolders({
      sortBy: "createdAt",
      sortType: "desc",
    });
    return data;
  } catch (error) {}
  return null;
};
