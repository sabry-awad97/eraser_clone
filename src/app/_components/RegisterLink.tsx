'use client';

import { RegisterLink as KRegisterLink } from '@kinde-oss/kinde-auth-nextjs';

const RegisterLink = () => {
  return (
    <div className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-black transition hover:text-slate-800 sm:block">
      <KRegisterLink>Register</KRegisterLink>
    </div>
  );
};

export default RegisterLink;
