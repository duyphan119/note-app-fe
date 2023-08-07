import { updateNote } from "@/api/note.api";
import { NoteResponse } from "@/types/note";
import { API_KEY_TINYMCE } from "@/utils/constants";
import { Editor } from "@tinymce/tinymce-react";
import { FC, useEffect, useState } from "react";
import { useLoaderData, useOutletContext } from "react-router-dom";

type Props = {};

type OutletContext = {
  updateTime: (noteId: string) => void;
};

const Note: FC<Props> = () => {
  const data = useLoaderData() as NoteResponse;
  const { updateTime } = useOutletContext<OutletContext>();
  const [rawHTML, setRawHTML] = useState<string>("<p></p>");
  const [loading, setLoading] = useState<boolean>(true);

  const handleEditorChange = (content: string) => {
    setRawHTML(content);
  };
  useEffect(() => {
    if (note && note.content !== rawHTML) {
      const timerId = setTimeout(() => {
        (async () => {
          try {
            const { data } = await updateNote({
              id: note.id,
              content: rawHTML,
            });
            if (data?.data?.updateNote?.isUpdated) {
              updateTime(note.id);
            }
          } catch (error) {}
        })();
      }, 500);

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [rawHTML]);

  if (!data) return <></>;

  const {
    data: {
      note: { note },
    },
  } = data;

  useEffect(() => {
    setRawHTML(note?.content ?? "<p></p>");
  }, [note]);

  return (
    <>
      <div className="relative h-[70vh]">
        {loading ? (
          <div className="bg-white absolute top-0 left-0 right-0 bottom-0"></div>
        ) : null}
        <Editor
          onInit={() => {
            setLoading(false);
          }}
          value={rawHTML}
          initialValue="<p>Note Content</p>"
          init={{
            height: "100%",
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            auto_focus: true,
          }}
          onEditorChange={(value, _) => handleEditorChange(value)}
          apiKey={API_KEY_TINYMCE}
        />
      </div>
    </>
  );
};

export default Note;
