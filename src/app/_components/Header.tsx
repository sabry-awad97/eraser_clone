import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const logoSrc = '/logo.svg';

const navLinks = [
  { text: 'About', href: '#' },
  { text: 'Careers', href: '#' },
  { text: 'History', href: '#' },
  { text: 'Services', href: '#' },
  { text: 'Projects', href: '#' },
];

const loginLink = { text: 'Login', href: '#' };
const registerLink = { text: 'Register', href: '#' };

const Header = () => {
  return (
    <header className="bg-black">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Image src={logoSrc} alt="logo" width={100} height={100} />

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    className="text-white transition hover:text-gray-100/75"
                    href={link.href}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <div className="block rounded-md px-5 py-2.5 text-sm font-medium text-white transition hover:text-gray-100/75">
                <Link href={loginLink.href}>{loginLink.text}</Link>
              </div>

              <div className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-black transition hover:text-slate-800 sm:block">
                <Link href={registerLink.href}>{registerLink.text}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
