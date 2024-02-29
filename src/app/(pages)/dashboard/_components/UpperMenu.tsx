import { Settings, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import LogoutLink from './LogoutLink';

const items = [
  {
    id: 1,
    name: 'Create Team',
    href: '/team/create',
    icon: Users,
  },
  {
    id: 2,
    name: 'Settings',
    href: '',
    icon: Settings,
  },
];

const UpperMenu = () => {
  const nextRouter = useRouter();

  const handleMenuItemClick = (item: (typeof items)[number]) => {
    if (item.href) {
      nextRouter.push(item.href);
    }
  };

  return (
    <ul>
      {items.map((item, index) => (
        <li
          key={index}
          className="flex cursor-pointer items-center gap-2 rounded-lg p-2 text-sm hover:bg-gray-100"
          onClick={() => handleMenuItemClick(item)}
        >
          <item.icon className="h-4 w-4" />
          <span>{item.name}</span>
        </li>
      ))}

      <LogoutLink />
    </ul>
  );
};

export default UpperMenu;
