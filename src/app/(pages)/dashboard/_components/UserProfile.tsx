import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/dist/types';
import Image from 'next/image';

interface Props {
  user: KindeUser | null;
}

const UserProfile: React.FC<Props> = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
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
  );
};

export default UserProfile;
