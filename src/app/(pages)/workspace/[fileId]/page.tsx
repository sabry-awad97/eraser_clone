'use client';

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { File } from '@/convex/file';
import { useConvex } from 'convex/react';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Editor from '../_components/Editor';
import WorkspaceHeader from '../_components/WorkspaceHeader';
import Canvas from '../_components/Canvas';

interface Props {
  params: { fileId?: Id<'files'> };
}

const WorkspaceFilePage = ({ params: { fileId } }: Props) => {
  const [isDocumentSaved, setIsDocumentSaved] = useState(false);
  const convex = useConvex();
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchFileData = async () => {
      if (!fileId) return;

      try {
        const result = await convex.query(api.file.getFileById, {
          _id: fileId,
        });
        setFile(result);
      } catch (error) {
        console.error('Error fetching file data:', error);
        toast('Error fetching file data.');
      }
    };

    if (fileId) {
      fetchFileData();
    }
  }, [fileId]);

  if (!fileId) {
    notFound();
  }

  return (
    <div>
      <WorkspaceHeader
        fileName={file?.fileName}
        onSave={() => setIsDocumentSaved(true)}
      />

      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="h-screen">
          <Editor
            onSave={() => setIsDocumentSaved(false)}
            isDocumentSaved={isDocumentSaved}
            file={file}
          />
        </div>
        <div className="col-span-2 h-screen border-l">
          <Canvas isDocumentSaved={isDocumentSaved} file={file} />
        </div>
      </div>
    </div>
  );
};

export default WorkspaceFilePage;
