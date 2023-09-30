import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './App';

export const NavBar = () => {
  const { session } = useContext(UserContext);

  return (
    <>
      <nav className="nav-bar">
        <Link className="nav-logo-link" to="/">
          {/* <img
            id="logo"
            className="nav-logo"
            src="https://supaship.io/supaship_logo_with_text.svg"
            alt="logo"
          /> */}
          <h2 style={{ color: '#4ee17c', fontSize: '32px', fontWeight: '900' }}>
            Caught-In-A-Thought
          </h2>
        </Link>

        <ul className="nav-right-list">
          <li className="nav-message-board-list-item">
            <Link to="/1" className="nav-message-board-link">
              message board
            </Link>
          </li>
          <li className="nav-auth-item">{session?.user ? 'user' : 'nope'}</li>
        </ul>
      </nav>
    </>
  );
};
