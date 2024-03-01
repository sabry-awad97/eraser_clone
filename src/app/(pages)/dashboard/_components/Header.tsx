'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Search, Send } from 'lucide-react';
import Image from 'next/image';

const Header = () => {
  const { user } = useKindeBrowserClient();
  return (
    <div className="flex w-full items-center justify-end gap-2">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4" />
        <Input placeholder="Search" className="pl-8" />
      </div>
      <div>
        <Image
          src={user?.picture || 'https://via.placeholder.com/30'}
          alt="user"
          width={30}
          height={30}
          className="rounded-full"
        />
      </div>
      <Button className="flex h-8 items-center gap-2 bg-blue-600 text-sm hover:bg-blue-700">
        <Send className="h-4 w-4" />
        <span>Invite</span>
      </Button>
    </div>
  );
};

export default Header;
