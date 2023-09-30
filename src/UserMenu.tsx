import { useContext } from 'react';

import { supaClient } from './supa-client';

import { UserContext } from './App';

export const UserMenu = () => {
  const { profile } = useContext(UserContext);

  return (
    <>
      <div className="flex flex-col">
        <h2>Welcome {profile?.username || 'panda'}</h2>
        <button onClick={() => supaClient.auth.signOut()} className="user-menu-logout-button">
          Logout
        </button>
      </div>
    </>
  );
};
