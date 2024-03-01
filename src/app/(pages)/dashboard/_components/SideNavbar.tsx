'use client';

import { MAX_FREE_FILES } from '@/app/_constants';
import { useTeams } from '@/app/_hooks/useTeams';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Team } from '@/convex/team';
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/dist/types';
import { ChevronDown, LayoutGrid } from 'lucide-react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import { useFileContext } from '../_context/FileContext';
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
  const { files: usedFiles, fetchFiles, createFile } = useFileContext();
  const teams = useTeams(user?.email);

  const nextRouter = useRouter();

  const searchParams = useSearchParams();
  const teamId = searchParams.get('teamId');

  const activeTeam = useMemo(
    () => teams.find(team => team._id === teamId) || null,
    [teams, teamId],
  );

  useEffect(() => {
    if (!activeTeam?._id) return;
    fetchFiles(activeTeam._id);
  }, [activeTeam?._id]);

  const handleTeamClick = (clickedTeam: Team) => {
    nextRouter.push(`?teamId=${clickedTeam._id}`);
  };

  const handleFileCreation = async (fileName: string) => {
    if (!activeTeam?._id || !user?.email) return;

    try {
      await createFile(activeTeam._id, fileName, user.email);

      toast.success('File Created', {
        description: `Successfully created file: ${fileName}`,
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
                <span>{activeTeam?.teamName || 'Select Team'}</span>
                <ChevronDown className="h-4 w-4" />
              </h2>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-full">
            <TeamList
              teams={teams}
              activeTeamId={activeTeam?._id}
              onTeamClick={handleTeamClick}
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

          {MAX_FREE_FILES > usedFiles.length ? (
            <FileCreationDialog onCreate={handleFileCreation} />
          ) : (
            <PlanUpgradeDialog />
          )}
        </Dialog>

        <FileUsageInfo usedFiles={usedFiles.length} maxFiles={MAX_FREE_FILES} />
      </div>
    </div>
  );
};

export default SideNavbar;
