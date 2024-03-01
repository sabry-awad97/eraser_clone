'use client';

import { api } from '@/convex/_generated/api';
import { Team } from '@/convex/team';
import { useConvex } from 'convex/react';
import { useEffect, useState } from 'react';

export const useTeams = (userEmail?: string | null) => {
  const convexClient = useConvex();
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const fetchTeams = async () => {
      if (!userEmail) return;
      const fetchedTeams = await convexClient.query(api.team.getTeams, {
        email: userEmail,
      });
      setTeams(fetchedTeams);
    };

    fetchTeams();
  }, [userEmail, convexClient]);

  return teams;
};
