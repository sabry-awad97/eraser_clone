import { Team } from '@/convex/team';
import { cn } from '@/lib/utils';

interface TeamListProps {
  teams: Team[];
  activeTeam: Team | null;
  onTeamClick: (team: Team) => void;
}

const TeamList: React.FC<TeamListProps> = ({
  teams,
  activeTeam,
  onTeamClick,
}) => {
  return (
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
          onClick={() => onTeamClick(team)}
        >
          {team.teamName}
        </li>
      ))}
    </ul>
  );
};

export default TeamList;
