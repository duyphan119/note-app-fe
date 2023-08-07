import { FC } from "react";
import { useRouteError } from "react-router-dom";

type Props = {};

const Error: FC<Props> = () => {
  const error: any = useRouteError();
  console.log("error:", error);
  return <div>{error.statusText || error.message}</div>;
};

export default Error;
