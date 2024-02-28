'use client';

import useUserCreation from '@/app/_hooks/useUserCreation';
import { Button } from '@/components/ui/button';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs';

const Dashboard = () => {
  useUserCreation();

  return (
    <div>
      Dashboard
      <Button>
        <LogoutLink>Logout</LogoutLink>
      </Button>
    </div>
  );
};

export default Dashboard;
