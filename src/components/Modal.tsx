import { FC, memo, ReactNode } from "react";

type Props = {
  onClose: () => void;
  children: ReactNode;
  title: string;
  className?: string;
  onOk?: () => void;
  okLoading?: boolean;
};

const Modal: FC<Props> = ({
  onClose,
  children,
  title,
  className = "",
  onOk,
  okLoading,
}) => {
  const handleClose = () => {
    onClose();
  };
  const handleOK = () => {
    onOk?.();
  };
  return (
    <>
      <div
        className="overlay fixed top-0 right-0 left-0 bottom-0 bg-[#00000090] z-[10]"
        onClick={onClose}
      ></div>
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow text-black md:min-w-[360px] z-[11] border border-hr ${className}`}
      >
        <div className="heading px-2 pt-2">{title}</div>
        <hr className="my-2 border-t-hr" />
        <div className="content px-2">{children}</div>
        <hr className="my-2 border-t-hr" />
        <div className="flex justify-end items-center gap-2 px-2 pb-2">
          <button
            className="px-4 py-1 rounded-sm bg-lightgrey"
            type="button"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-1 rounded-sm bg-darkpink text-white"
            type="submit"
            onClick={handleOK}
            form="form"
          >
            {okLoading ? "Loading..." : "OK"}
          </button>
        </div>
      </div>
    </>
  );
};

export default memo(Modal);
