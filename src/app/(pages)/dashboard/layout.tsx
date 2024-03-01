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
      <div className="fixed h-screen w-72">
        <SideNavbar user={currentUser} />
      </div>
      <div className="col-span-4 ml-72">{children}</div>
    </div>
  );
};

export default DashboardLayout;
