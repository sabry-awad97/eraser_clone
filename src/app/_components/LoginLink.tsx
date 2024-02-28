'use client';

import { LoginLink as KLoginLink } from '@kinde-oss/kinde-auth-nextjs';

const LoginLink = () => {
  return (
    <div className="block rounded-md px-5 py-2.5 text-sm font-medium text-white transition hover:text-gray-100/75">
      <KLoginLink postLoginRedirectURL="/dashboard">Login</KLoginLink>
    </div>
  );
};

export default LoginLink;
