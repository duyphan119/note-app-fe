import { LoginInput, LoginResponse } from "@/types/author";
import request from "@/utils/request";
import { AxiosResponse } from "axios";

export const login = (
  loginInput: LoginInput
): Promise<AxiosResponse<LoginResponse>> =>
  request(
    `mutation Login($loginInput: LoginInput!) {
        login(loginInput: $loginInput) {
            author {
                name
                uid
                avatar
            }
        }
    }`,
    {
      loginInput,
    }
  );
