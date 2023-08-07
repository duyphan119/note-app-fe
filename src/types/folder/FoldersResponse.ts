import { GqlResponse } from "../common";
import Folder from "./Folder";

type FoldersResponse = GqlResponse<{
  folders: { folders: Folder[]; count: number; totalPages: number };
}>;

export default FoldersResponse;
