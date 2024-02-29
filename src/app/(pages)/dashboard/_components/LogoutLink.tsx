'use client';

import { LogoutLink as KLogoutLink } from '@kinde-oss/kinde-auth-nextjs';
import { LogOut } from 'lucide-react';

const LogoutLink = () => {
  return (
    <KLogoutLink>
      <p
        className="flex cursor-pointer items-center gap-2 rounded-lg p-2 text-sm hover:bg-gray-100"
        onClick={() => {}}
      >
        <LogOut className="h-4 w-4" />
        <span>Logout</span>
      </p>
    </KLogoutLink>
  );
};

export default LogoutLink;
