'use client';

import { MAX_FREE_FILES } from '@/app/_constants';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { api } from '@/convex/_generated/api';
import { Team } from '@/convex/team';
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/dist/types';
import { useConvex } from 'convex/react';
import { ChevronDown, LayoutGrid } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import FileCreationDialog from './FileCreationDialog';
import FileUsageInfo from './FileUsageInfo';
import LowerMenu from './LowerMenu';
import PlanUpgradeDialog from './PlanUpgradeDialog';
import TeamList from './TeamList';
import UpperMenu from './UpperMenu';
import UserProfile from './UserProfile';

interface Props {
  user: KindeUser | null;
}

const SideNavbar: React.FC<Props> = ({ user }) => {
  const convexClient = useConvex();
  const [teams, setTeams] = useState<Team[]>([]);
  const [activeTeam, setActiveTeam] = useState<Team | null>(null);
  const [usedFiles, setUsedFiles] = useState(0);

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

  const handleFileCreation = async (fileName: string) => {
    if (!activeTeam?._id || !user?.email) return;

    try {
      await convexClient.mutation(api.file.createFile, {
        fileName: fileName,
        teamId: activeTeam._id,
        owner: user.email,
      });

      const result = await convexClient.query(api.file.getFiles, {
        teamId: activeTeam._id,
      });

      setUsedFiles(result.length);

      toast.success('File Created', {
        description: `Successfully created file ${fileName}`,
      });
    } catch (error) {
      console.error('Error while creating file:', error);
      toast.error('Error while creating file.');
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
            <TeamList
              teams={teams}
              activeTeam={activeTeam}
              onTeamClick={setActiveTeam}
            />

            <Separator className="mt-2 bg-slate-100" />

            <UpperMenu />

            <Separator className="mt-2 bg-slate-100" />

            <UserProfile user={user} />
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
        <LowerMenu />

        <Dialog>
          <DialogTrigger className="w-full" asChild>
            <Button className="mt-3 w-full justify-start bg-blue-600 hover:bg-blue-700">
              New File
            </Button>
          </DialogTrigger>

          {MAX_FREE_FILES > 0 ? (
            <FileCreationDialog onCreate={handleFileCreation} />
          ) : (
            <PlanUpgradeDialog />
          )}
        </Dialog>

        <FileUsageInfo usedFiles={usedFiles} maxFiles={MAX_FREE_FILES} />
      </div>
    </div>
  );
};

export default SideNavbar;
