'use client';

import useEnsureTeamExists from '@/app/_hooks/useEnsureTeamExists';
import useUserCreation from '@/app/_hooks/useUserCreation';
import { PropsWithChildren } from 'react';

const DashboardLayout = ({ children }: Readonly<PropsWithChildren>) => {
  useEnsureTeamExists();
  useUserCreation();

  return <div>{children}</div>;
};

export default DashboardLayout;
