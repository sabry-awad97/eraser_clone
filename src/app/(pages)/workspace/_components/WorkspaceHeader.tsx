import { Button } from '@/components/ui/button';
import { Link, Save } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface Props {
  fileName?: string;
  onSave: () => void;
}

const WorkspaceHeader = ({ fileName, onSave }: Props) => {
  return (
    <div className="flex items-center justify-between border-b p-3">
      <div className="flex items-center gap-2">
        <Image
          src={'/logo.png'}
          alt="logo"
          height={40}
          width={40}
          style={{
            width: 'auto',
            height: 'auto',
          }}
        />
        <h2>{fileName}</h2>
      </div>
      <div className="flex items-center gap-4">
        <Button
          className="h-8 gap-2 bg-yellow-500 text-[12px] hover:bg-yellow-600"
          onClick={onSave}
        >
          <Save className="h-4 w-4" />
          <span>Save</span>
        </Button>
        <Button className="h-8 gap-2 bg-blue-600 text-[12px] hover:bg-blue-700">
          <span>Share</span>
          <Link className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default WorkspaceHeader;
