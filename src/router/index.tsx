import { NoteList, Note } from "@/components";
import { AuthLayout } from "@/layouts";
import { Error, Home, Login } from "@/pages";
import { foldersLoader } from "@/utils/folderUtils";
import { noteLoader, notesLoader } from "@/utils/noteUtils";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/",
            element: <Home />,
            loader: foldersLoader,
            children: [
              {
                path: "folders/:folderId",
                element: <NoteList />,
                loader: notesLoader,
                children: [
                  {
                    path: "notes/:noteId",
                    loader: noteLoader,
                    element: <Note />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
