import { ActiveUserList } from '../active-user-list/ActiveUserList.tsx';
import './Footer.css';
import { useActiveUsers } from "../../features/hooks/useActiveUsers.ts";

export const Footer = () => {
  const activeUsers = useActiveUsers();
  return (
      <div className="footer">
        {activeUsers.length > 0 ? <ActiveUserList activeUsers={activeUsers}/> : <p>Активные пользователи отсутствуют</p>}
      </div>
  );
};
