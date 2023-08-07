import axios, { AxiosResponse } from "axios";
import { SERVER } from "./constants";

const request = (
  query: string,
  variables: any
): Promise<AxiosResponse<any>> => {
  const accessToken = localStorage.getItem("accessToken");
  const instanceAxios = axios.create({
    baseURL: SERVER,
    headers: {
      ...(accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          }
        : ""),
    },
  });

  return instanceAxios.post(
    "graphql",
    JSON.stringify({
      query,
      variables,
    })
  );
};

export default request;
