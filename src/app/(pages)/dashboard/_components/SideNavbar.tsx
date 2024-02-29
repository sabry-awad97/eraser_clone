'use client';

import { Button } from '@/components/ui/button';
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
import { useConvex } from 'convex/react';
import { ChevronDown, LayoutGrid, LogOut, Settings, Users } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Props {
  user: KindeUser | null;
}

const menu = [
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

  const handleMenuItemClick = (item: (typeof menu)[number]) => {
    if (item.href) {
      nextRouter.push(item.href);
    }
  };

  return (
    <div className="fixed flex h-screen w-72 flex-col border-r p-6">
      <div>
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
              {menu.map((item, index) => (
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
    </div>
  );
};

export default SideNavbar;
