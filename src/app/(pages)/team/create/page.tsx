'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { useState } from 'react';

const TeamCreation = () => {
  const [teamName, setTeamName] = useState('');

  return (
    <div className="my-16 px-6 md:px-16">
      <Image
        src="/logo.png"
        alt="logo"
        width={200}
        height={200}
        style={{
          width: 'auto',
          height: 'auto',
        }}
      />
      <div className="mt-8 flex flex-col items-center">
        <h2 className="py-3 text-[40px] font-bold">
          What should we call your team?
        </h2>
        <h2 className="text-gray-500">
          You can always change this later from settings.
        </h2>
        <div className="mt-7 w-[40%]">
          <Label className="text-gray-500">Team Name</Label>
          <Input
            placeholder="Team Name"
            className="mt-3"
            value={teamName}
            onChange={e => setTeamName(e.target.value)}
          />
        </div>
        <Button
          className="mt-9 w-[30%] bg-blue-500 hover:bg-blue-600"
          disabled={!teamName.length}
          onClick={() => {}}
        >
          Create Team
        </Button>
      </div>
    </div>
  );
};

export default TeamCreation;
