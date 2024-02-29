'use client';

import { Button } from '@/components/ui/button';
import { DialogHeader, DialogFooter } from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { api } from '@/convex/_generated/api';
import { Team } from '@/convex/team';
import { cn } from '@/lib/utils';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs';
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/dist/types';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@radix-ui/react-dialog';
import { useConvex } from 'convex/react';
import {
  Archive,
  ChevronDown,
  Flag,
  Github,
  LayoutGrid,
  LogOut,
  Settings,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Input } from 'postcss';
import { useEffect, useState } from 'react';

interface Props {
  user: KindeUser | null;
}

const upperMenuItems = [
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

const SideNavbar: React.FC<Props> = ({ user }) => {
  const convexClient = useConvex();
  const nextRouter = useRouter();
  const [teams, setTeams] = useState<Team[]>([]);
  const [activeTeam, setActiveTeam] = useState<Team | null>(null);

  useEffect(() => {
    getTeamList();
  }, [user]);

  const getTeamList = async () => {
    if (!user?.email) return;

    const teams = await convexClient.query(api.team.getTeams, {
      email: user.email,
    });

    setTeams(teams);
    setActiveTeam(teams[0] ?? null);
  };

  const handleMenuItemClick = (item: (typeof upperMenuItems)[number]) => {
    if (item.href) {
      nextRouter.push(item.href);
    }
  };

  return (
    <div className="fixed flex h-screen w-72 flex-col border-r p-6">
      <div className="flex-1">
        <Popover>
          <PopoverTrigger>
            <div className="flex cursor-pointer items-center gap-3 rounded-lg p-3 hover:bg-slate-200">
              <Image
                src="/logo.png"
                alt="logo"
                width={40}
                height={40}
                style={{ width: 'auto', height: 'auto' }}
              />
              <h2 className="flex items-center gap-2 text-[17px] font-bold">
                <span>{activeTeam?.teamName}</span>
                <ChevronDown className="h-4 w-4" />
              </h2>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-full">
            <ul>
              {teams?.map((team, index) => (
                <li
                  key={index}
                  className={cn(
                    'mb-1 cursor-pointer rounded-lg p-2 hover:bg-blue-500 hover:text-white',
                    {
                      'bg-blue-500 text-white': activeTeam?._id == team._id,
                    },
                  )}
                  onClick={() => setActiveTeam(team)}
                >
                  {team.teamName}
                </li>
              ))}
            </ul>

            <Separator className="mt-2 bg-slate-100" />

            <ul>
              {upperMenuItems.map((item, index) => (
                <li
                  key={index}
                  className="flex cursor-pointer items-center gap-2 rounded-lg p-2 text-sm hover:bg-gray-100"
                  onClick={() => handleMenuItemClick(item)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </li>
              ))}

              <LogoutLink>
                <p
                  className="flex cursor-pointer items-center gap-2 rounded-lg p-2 text-sm hover:bg-gray-100"
                  onClick={() => {}}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </p>
              </LogoutLink>
            </ul>

            <Separator className="mt-2 bg-slate-100" />

            {user && (
              <div className="mt-2 flex items-center gap-2">
                <Image
                  src={user?.picture || 'https://via.placeholder.com/30'}
                  alt="user"
                  width={30}
                  height={30}
                  className="rounded-full"
                  style={{ width: 'auto', height: 'auto' }}
                />
                <div>
                  <p className="text-[14px] font-bold">
                    {user?.given_name} {user?.family_name}
                  </p>
                  <p className="text-[12px] text-gray-500">{user?.email}</p>
                </div>
              </div>
            )}
          </PopoverContent>
        </Popover>

        <Button
          variant="outline"
          className="mt-8 w-full
          justify-start gap-2 bg-gray-100 font-bold"
        >
          <LayoutGrid className="h-4 w-4" />
          All Files
        </Button>
      </div>

      <div>
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

        <Dialog>
          <DialogTrigger className="w-full" asChild>
            <Button className="mt-3 w-full justify-start bg-blue-600 hover:bg-blue-700">
              New File
            </Button>
          </DialogTrigger>
        </Dialog>

        <div className="mt-5 h-4 w-full rounded-full bg-gray-200">
          <div className={`h-4 w-[40%] rounded-full bg-blue-600`}></div>
        </div>

        <p className="mt-3 text-[12px]">
          <strong>1</strong> out of <strong>5</strong> files used
        </p>
        <p className="mt-1 text-[12px]">
          Upgrade your plan for unlimited access.
        </p>
      </div>
    </div>
  );
};

export default SideNavbar;
