import FolderList from "@/components/FolderList";
import UserMenu from "@/components/UserMenu";
import { useDocumentTitle } from "@/hooks";
import { FoldersResponse } from "@/types/folder";
import { FC } from "react";
import { Outlet, useLoaderData } from "react-router-dom";

const Home: FC<any> = () => {
  useDocumentTitle("Trang chủ");
  const data = useLoaderData() as FoldersResponse;
  if (!data) return <></>;
  const {
    data: {
      folders: { folders },
    },
  } = data;
  return (
    <div className="xl:px-44 px-4">
      <div className="text-center my-6 text-4xl font-bold">NOTE APP</div>
      <UserMenu />
      <div className="grid grid-cols-4 shadow">
        <div className="col-span-1">
          <FolderList folders={folders} />
        </div>
        <div className="col-span-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
