import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useContext, useEffect, useState } from 'react';

import { supaClient } from './supa-client';

import { UserContext } from './App';
import { Dialog } from './Dialog';

export const Login = () => {
  const [showModal, setShowModal] = useState(false);
  const [authMode, setAuthMode] = useState<'sign_in' | 'sign_up'>('sign_in');
  const { session } = useContext(UserContext);

  useEffect(() => {
    if (session?.user) {
      setShowModal(false);
    }
  }, [session]);

  return (
    <>
      <div className="flex m-4 place-items-center">
        <button
          className="login-button"
          onClick={() => {
            setShowModal(true);
            setAuthMode('sign_in');
          }}
        >
          Login
        </button>{' '}
        <span className="p-2"> or </span>{' '}
        <button
          onClick={() => {
            setShowModal(true);
            setAuthMode('sign_up');
          }}
        >
          Sign Up
        </button>
      </div>

      <Dialog
        open={showModal}
        dialogStateChange={(open) => setShowModal(open)}
        contents={
          <>
            {
              <Auth
                supabaseClient={supaClient}
                view={authMode}
                appearance={{
                  theme: ThemeSupa,
                  className: {
                    container: 'login-form-container',
                    label: 'login-form-label',
                    button: 'login-form-button',
                    input: 'login-form-input',
                  },
                }}
                // providers={['google']}
              />
            }
          </>
        }
      />
    </>
  );
};
