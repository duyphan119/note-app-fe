type NoteQueryParamsInput = Partial<{
  limit: number;
  p: number;
  sortBy: string;
  sortType: string;
}> & { folderId: string };

export default NoteQueryParamsInput;
