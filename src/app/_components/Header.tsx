import Image from 'next/image';
import Link from 'next/link';
import LoginLink from './LoginLink';
import RegisterLink from './RegisterLink';

const navLinks = [
  { text: 'About', href: '#' },
  { text: 'Careers', href: '#' },
  { text: 'History', href: '#' },
  { text: 'Services', href: '#' },
  { text: 'Projects', href: '#' },
];

const Header = () => {
  return (
    <header className="bg-black">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Image
          src="/logo.svg"
          alt="logo"
          width={100}
          height={100}
          style={{ width: 'auto', height: 'auto' }}
        />

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
              <LoginLink />
              <RegisterLink />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
