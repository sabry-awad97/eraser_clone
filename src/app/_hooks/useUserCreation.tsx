import { api } from '@/convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useConvex } from 'convex/react';
import { useEffect } from 'react';

const useUserCreation = () => {
  const { user } = useKindeBrowserClient();
  const convex = useConvex();

  useEffect(() => {
    const checkAndCreateUserIfNotExist = async () => {
      try {
        if (!user?.email) return;

        const users = await convex.query(api.user.getUsers, {
          email: user.email,
        });

        if (users.length === 0) {
          await convex.mutation(api.user.createUser, {
            name: `${user.given_name ?? ''}${user.given_name && user.family_name ? ' ' : ''}${user.family_name ?? ''}`,
            email: user.email,
            image: user.picture ?? '',
          });
        }
      } catch (error) {
        console.error('Error while checking user:', error);
      }
    };

    checkAndCreateUserIfNotExist();
  }, [convex, user]);

  return { user };
};

export default useUserCreation;
