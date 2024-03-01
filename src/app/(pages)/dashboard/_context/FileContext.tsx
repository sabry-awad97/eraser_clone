'use client';

import { File } from '@/convex/file';
import { createContext, useContext, useState } from 'react';

interface FileContextValue {
  files: File[];
  updateFiles: (files: File[]) => void;
}

const FileContext = createContext<FileContextValue | null>(null);

interface FileContextProviderProps {
  children: React.ReactNode;
}

export const FileContextProvider: React.FC<FileContextProviderProps> = ({
  children,
}) => {
  const [files, setFiles] = useState<File[]>([]);

  const updateFiles = (updatedFiles: File[]) => {
    setFiles(updatedFiles);
  };

  const fileContextValue: FileContextValue = {
    files,
    updateFiles,
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
