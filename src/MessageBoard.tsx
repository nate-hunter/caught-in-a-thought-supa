import { Link, Outlet } from 'react-router-dom';

export const MessageBoard = () => {
  return (
    <div className="message-board-container">
      <Link to="/1">
        <h2 className="message-board-header-link">Message Board...</h2>
        <p>A board of messages...</p>
      </Link>
      <Outlet />
    </div>
  );
};
