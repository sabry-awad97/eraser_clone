'use client';

import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface FileCreationDialogProps {
  onCreate: (file: string) => void;
}

const FileCreationDialog: React.FC<FileCreationDialogProps> = ({
  onCreate,
}) => {
  const [fileInput, setFileInput] = useState('');

  return (
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
            onClick={() => onCreate(fileInput)}
          >
            Create
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default FileCreationDialog;
