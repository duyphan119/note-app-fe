import {
  AuthorNotificationsResponse,
  NotificationQueryParamsInput,
  UpdateNotificationsResponse,
} from "@/types/notification";
import request from "@/utils/request";
import { AxiosResponse } from "axios";

export const getAuthorNotifications = (
  authorNotificationQueryParamsInput: NotificationQueryParamsInput
): Promise<AxiosResponse<AuthorNotificationsResponse>> =>
  request(
    `query Query($authorNotificationQueryParamsInput: NotificationQueryParamsInput!) {
      authorNotifications(authorNotificationQueryParamsInput: $authorNotificationQueryParamsInput) {
        count
        totalPages
        notifications {
          seenIds
          id
          createdAt
          content
        }
      }
    }`,
    { authorNotificationQueryParamsInput }
  );

export const readNotifications = (
  idList: string[]
): Promise<AxiosResponse<UpdateNotificationsResponse>> =>
  request(
    `mutation Mutation($idList: [String!]!) {
        seenNotification(idList: $idList) {
          isUpdated
        }
      }`,
    { idList }
  );
