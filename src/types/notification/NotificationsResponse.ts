import { GqlResponse } from "../common";

type NotificationsResponse = GqlResponse<{
  notifications: {
    notifications: Notification[];
    count: number;
    totalPages: number;
  };
}>;

export default NotificationsResponse;
