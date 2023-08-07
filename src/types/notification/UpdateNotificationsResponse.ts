import { GqlResponse } from "../common";

type UpdateNotificationsResponse = GqlResponse<{
  seenNotification: {
    isUpdated: boolean;
  };
}>;

export default UpdateNotificationsResponse;
