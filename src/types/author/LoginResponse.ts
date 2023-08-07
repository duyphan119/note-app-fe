import { GqlResponse } from "../common";
import Author from "./Author";

type LoginResponse = GqlResponse<{
  login: {
    author: Author;
  };
}>;

export default LoginResponse;
