import './ActiveUserList.css';
import { useCollaboration } from "../../features/hooks/useCollaboration.ts";
import type { ActiveUser } from "../../utils/readUsers.ts";
import { WebSocketStatus } from "@hocuspocus/provider";

interface ActiveUserListProps {
  activeUsers: ActiveUser[];
}

export const ActiveUserList = ({ activeUsers }: ActiveUserListProps) => {
  const { status } = useCollaboration();

  const userStatus = status === WebSocketStatus.Connected ? 'онлайн' : 'оффлайн'

  return (
      <ul className="user-list">
        {activeUsers.map((activeUser: ActiveUser) => (
            <li className="user-item">
              <div className="user-name">{activeUser.name} {userStatus}</div>
            </li>
        ))}

      </ul>
  );
};
