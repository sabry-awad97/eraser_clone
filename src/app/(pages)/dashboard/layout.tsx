'use client';

import useEnsureTeamExists from '@/app/_hooks/useEnsureTeamExists';
import useUserCreation from '@/app/_hooks/useUserCreation';
import { PropsWithChildren } from 'react';
import SideNavbar from './_components/SideNavbar';

const DashboardLayout = ({ children }: Readonly<PropsWithChildren>) => {
  const { user: currentUser } = useUserCreation();
  useEnsureTeamExists({ currentUser });

  return (
    <div className="grid grid-cols-4">
      <div>
        <SideNavbar user={currentUser} />
      </div>
      <div className="grid-cols-3">{children}</div>
    </div>
  );
};

export default DashboardLayout;
