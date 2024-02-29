'use client';

import { MAX_FREE_FILE } from '@/app/_constants';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
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
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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

  const [fileInput, setFileInput] = useState('');

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

  const onFileCreate = (fileName: string) => {
    console.log(fileName);
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

          {MAX_FREE_FILE > 0 ? (
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New File</DialogTitle>
                <DialogDescription>
                  <Input
                    placeholder="Enter File Name"
                    className="mt-3"
                    onChange={e => setFileInput(e.target.value)}
                  />
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="">
                <DialogClose asChild>
                  <Button
                    type="button"
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={!fileInput.length}
                    onClick={() => onFileCreate(fileInput)}
                  >
                    Create
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          ) : (
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Upgrade Plan</DialogTitle>
                <DialogDescription>
                  <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
                      <div className="rounded-2xl border border-indigo-600 p-6 shadow-sm ring-1 ring-indigo-600 sm:order-last sm:px-8 lg:p-12">
                        <div className="text-center">
                          <h2 className="text-lg font-medium text-gray-900">
                            Professional
                            <span className="sr-only">Plan</span>
                          </h2>

                          <p className="mt-2 sm:mt-4">
                            <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                              4.99$
                            </strong>

                            <span className="text-sm font-medium text-gray-700">
                              /month
                            </span>
                          </p>
                        </div>

                        <ul className="mt-6 space-y-2">
                          <li className="flex items-center gap-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-5 text-indigo-700"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12.75l6 6 9-13.5"
                              />
                            </svg>

                            <span className="text-gray-700">
                              Everything included in free, plus:
                            </span>
                          </li>

                          <li className="flex items-center gap-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-5 text-indigo-700"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12.75l6 6 9-13.5"
                              />
                            </svg>

                            <span className="text-gray-700">
                              Unlimited Team Files
                            </span>
                          </li>

                          <li className="flex items-center gap-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-5 text-indigo-700"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12.75l6 6 9-13.5"
                              />
                            </svg>

                            <span className="text-gray-700">
                              More document features
                            </span>
                          </li>

                          <li className="flex items-center gap-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-5 text-indigo-700"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12.75l6 6 9-13.5"
                              />
                            </svg>

                            <span className="text-gray-700">Email Support</span>
                          </li>

                          <li className="flex items-center gap-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-5 text-indigo-700"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12.75l6 6 9-13.5"
                              />
                            </svg>

                            <span className="text-gray-700">
                              Instagram support
                            </span>
                          </li>
                        </ul>

                        <Link
                          href="#"
                          className="mt-8 block rounded-full border border-indigo-600 bg-indigo-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-indigo-700 hover:ring-1 hover:ring-indigo-700 focus:outline-none focus:ring active:text-indigo-500"
                        >
                          Upgrade
                        </Link>
                      </div>

                      <div className="rounded-2xl border border-gray-200 p-6 shadow-sm sm:px-8 lg:p-12">
                        <div className="text-center">
                          <h2 className="text-lg font-medium text-gray-900">
                            Free
                            <span className="sr-only">Plan</span>
                          </h2>

                          <p className="mt-2 sm:mt-4">
                            <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                              Free
                            </strong>

                            <span className="text-sm font-medium text-gray-700">
                              /month
                            </span>
                          </p>
                        </div>

                        <ul className="mt-6 space-y-2">
                          <li className="flex items-center gap-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-5 text-indigo-700"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12.75l6 6 9-13.5"
                              />
                            </svg>

                            <span className="text-gray-700">5 Team files</span>
                          </li>

                          <li className="flex items-center gap-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-5 text-indigo-700"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12.75l6 6 9-13.5"
                              />
                            </svg>

                            <span className="text-gray-700">
                              Limited Document feature
                            </span>
                          </li>

                          <li className="flex items-center gap-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-5 text-indigo-700"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12.75l6 6 9-13.5"
                              />
                            </svg>

                            <span className="text-gray-700">Email Support</span>
                          </li>
                        </ul>

                        <a
                          href="#"
                          className="mt-8 block rounded-full border border-indigo-600 bg-white px-12 py-3 text-center text-sm font-medium text-indigo-600 hover:ring-1 hover:ring-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                        >
                          Get Started
                        </a>
                      </div>
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="">
                <DialogClose asChild></DialogClose>
              </DialogFooter>
            </DialogContent>
          )}
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
