import { WebSocketStatus } from '@hocuspocus/provider';
import './Header.css';
import { useCollaboration } from '../../features/hooks/useCollaboration.ts';
import classNames from 'classnames';
import { useActiveUsers } from "../../features/hooks/useActiveUsers.ts";

export const Header = () => {
  const { status } = useCollaboration();
  const isOnline = status === WebSocketStatus.Connected;
  const users = useActiveUsers();

  return (
    <header className="header">
      <div className="header-top">
        <h1 className="header-title">Collaborative Note</h1>
        <div className={classNames(`user-status`, isOnline ? 'online' : 'offline')}>
          {isOnline ? 'Онлайн' : 'Офлайн'}
        </div>
      </div>
      <div className="header-bottom">
        <div className="active-users">Пользователей онлайн: {users.length}</div>
      </div>
    </header>
  );
};
