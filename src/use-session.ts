import { RealtimeChannel, Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { setReturnPath } from './Login';
import { supaClient } from './supa-client';

export type UserProfile = {
  username: string;
  avatarUrl?: string;
};

export type SupashipUserInfo = {
  session: Session | null;
  profile: UserProfile | null;
};

export const useSession = (): SupashipUserInfo => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState<SupashipUserInfo>({
    session: null,
    profile: null,
  });
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  useEffect(() => {
    supaClient.auth.getSession().then(({ data: { session } }) => {
      setUserInfo({ ...userInfo, session });
      supaClient.auth.onAuthStateChange((_event, session) => {
        setUserInfo({ session, profile: null });
      });
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (userInfo.session?.user && !userInfo.profile) {
      listenToUserProfileChanges(userInfo.session.user.id).then((newChannel) => {
        if (channel) {
          channel.unsubscribe();
        }
        setChannel(newChannel);
      });
    } else if (!userInfo.session?.user) {
      channel?.unsubscribe();
      setChannel(null);
    }
    // eslint-disable-next-line
  }, [userInfo.session]);

  async function listenToUserProfileChanges(userId: string) {
    const { data } = await supaClient
      .from('user_profiles')
      .select('*')
      .filter('user_id', 'eq', userId);

    if (!data?.length) {
      setReturnPath();
      navigate('/welcome');
    }

    if (data?.[0]) {
      setUserInfo({ ...userInfo, profile: data?.[0] });
    }

    return supaClient
      .channel(`public:user_profiles`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_profiles',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          setUserInfo({ ...userInfo, profile: payload.new as UserProfile });
        },
      )
      .subscribe();
  }

  return userInfo;
};
