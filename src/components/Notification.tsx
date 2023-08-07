import {
  FC,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useContext,
} from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { Notification as NotificationType } from "@/types/notification";
import { createClient } from "graphql-ws";
import {
  getAuthorNotifications,
  readNotifications,
} from "@/api/notification.api";
import { AuthContext } from "@/context";
import moment from "moment";
import { WS_GRAPHQL_SERVER } from "@/utils/constants";

type Props = {};

const client = createClient({
  url: WS_GRAPHQL_SERVER,
});

const Notification: FC<Props> = () => {
  const {
    user: { uid },
  } = useContext(AuthContext);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const handleToggle = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);

  const unreadList = useMemo(
    () => notifications.filter((item) => !item.seenIds.includes(uid)),
    [notifications]
  );

  useEffect(() => {
    (async () => {
      try {
        const query = client.iterate({
          query: `subscription NotificationAdded {
            notificationAdded {
                id
                createdAt
                content
                seenIds
            }
            }`,
        });

        const { value } = await query.next();
        const notification = value.data.notificationAdded;
        setNotifications((prevState) => [
          notification,
          ...prevState.filter((item) => item.id !== notification.id),
        ]);
      } catch (error) {}
    })();
    (async () => {
      try {
        const { data } = await getAuthorNotifications({ limit: 8 });
        setNotifications(data.data.authorNotifications.notifications);
      } catch (error) {}
    })();
  }, []);

  useEffect(() => {
    if (open && unreadList.length > 0) {
      const timerId = setTimeout(() => {
        (async () => {
          try {
            const { data } = await readNotifications(
              unreadList.map((item) => item.id)
            );
            if (data?.data?.seenNotification?.isUpdated)
              setNotifications((prevState) =>
                prevState.map((itemState) =>
                  unreadList.find((item) => item.id === itemState.id)
                    ? { ...itemState, seen: true }
                    : itemState
                )
              );
          } catch (error) {}
        })();
      }, 500);

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [open, unreadList]);

  return (
    <button type="button" className={`relative `}>
      <div className="relative">
        <IoNotificationsOutline
          onClick={handleToggle}
          className="cursor-pointer text-xl"
        />
        {unreadList.length > 0 ? (
          <div className="w-2 h-2 bg-red absolute -top-1 -right-1 rounded-full"></div>
        ) : null}
      </div>
      {open ? (
        <ul className="absolute top-full right-0 z-[11] shadow select-none w-72 max-h-[260px] overflow-y-auto bg-white">
          {notifications.map((notification) => {
            const { id, content, createdAt } = notification;
            return (
              <li
                key={id}
                className="text-black p-2 cursor-default first:border-none border-t border-t-hr"
              >
                <p className="text-left text-sm line-clamp-1">{content}</p>
                <p className="text-[10px] text-right">
                  {moment(+createdAt).format("DD-MM-YYYY HH:mm:ss")}
                </p>
              </li>
            );
          })}
        </ul>
      ) : null}
    </button>
  );
};

export default Notification;
