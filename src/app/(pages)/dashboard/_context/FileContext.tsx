'use client';

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { File } from '@/convex/file';
import { useConvex } from 'convex/react';
import { createContext, useContext, useState } from 'react';

interface FileContextValue {
  files: File[];
  fetchFiles: (teamId: Id<'teams'>) => Promise<void>;
  createFile: (
    teamId: Id<'teams'>,
    fileName: string,
    userEmail: string,
  ) => Promise<void>;
}

const FileContext = createContext<FileContextValue | null>(null);

interface FileContextProviderProps {
  children: React.ReactNode;
}

export const FileContextProvider: React.FC<FileContextProviderProps> = ({
  children,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const convexClient = useConvex();

  const fetchFiles = async (teamId: Id<'teams'>) => {
    if (!teamId) return;
    const fetchedFiles = await convexClient.query(api.file.getFiles, {
      teamId,
    });
    setFiles(fetchedFiles);
  };

  const createFile = async (
    teamId: Id<'teams'>,
    fileName: string,
    userEmail: string,
  ) => {
    await convexClient.mutation(api.file.createFile, {
      fileName,
      teamId,
      owner: userEmail,
      archive: false,
      document: '',
      whiteboard: '',
    });

    fetchFiles(teamId);
  };

  const fileContextValue: FileContextValue = {
    files,
    fetchFiles,
    createFile,
  };

  return (
    <FileContext.Provider value={fileContextValue}>
      {children}
    </FileContext.Provider>
  );
};

export const useFileContext = () => {
  const context = useContext(FileContext);

  if (!context)
    throw new Error('useFileContext must be used within a FileContextProvider');

  return context;
};
