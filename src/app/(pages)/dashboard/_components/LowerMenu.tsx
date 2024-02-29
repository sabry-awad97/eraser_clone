import { Archive, Flag, Github } from 'lucide-react';

const lowerMenuItems = [
  {
    id: 1,
    name: 'Getting Started',
    href: '',
    icon: Flag,
  },
  {
    id: 2,
    name: 'Github',
    href: '',
    icon: Github,
  },
  {
    id: 3,
    name: 'Archive',
    href: '',
    icon: Archive,
  },
];

const LowerMenu = () => {
  return (
    <ul>
      {lowerMenuItems.map((item, index) => (
        <li
          key={index}
          className="flex cursor-pointer gap-2 rounded-md p-1 px-2 text-[14px] hover:bg-gray-100"
        >
          <item.icon className="h-4 w-4" />
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default LowerMenu;
