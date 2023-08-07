import { GqlResponse } from "../common";
import Notification from "./Notification";

type AuthorNotificationsResponse = GqlResponse<{
  authorNotifications: {
    notifications: Notification[];
    count: number;
    totalPages: number;
  };
}>;

export default AuthorNotificationsResponse;
