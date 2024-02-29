import { api } from '@/convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useConvex } from 'convex/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useEnsureTeamExists = () => {
  const { user: currentUser } = useKindeBrowserClient();
  const convexClient = useConvex();
  const nextRouter = useRouter();

  useEffect(() => {
    const checkAndRedirectIfNoTeams = async () => {
      try {
        if (!currentUser?.email) return;

        const userTeams = await convexClient.query(api.team.getTeams, {
          email: currentUser.email,
        });

        if (userTeams.length === 0) {
          nextRouter.push('/team/create');
        }
      } catch (error) {
        console.error('Error while checking user team:', error);
      }
    };

    checkAndRedirectIfNoTeams();
  }, [convexClient, currentUser]);
};

export default useEnsureTeamExists;
