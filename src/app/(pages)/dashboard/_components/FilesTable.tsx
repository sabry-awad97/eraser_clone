'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Archive, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import { useFileContext } from '../_context/FileContext';

const formatDate = (dateNumber: number) => {
  const date = new Date(dateNumber);
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const FilesTable = () => {
  const headers = ['File Name', 'Created At', 'Edited', 'Author'];

  const { files } = useFileContext();
  const { user } = useKindeBrowserClient();

  return (
    <div className="mt-10 overflow-x-auto rounded-md border">
      <Table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <TableCaption className="text-center text-sm text-gray-500">
          List of Files
        </TableCaption>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead
                key={index}
                className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-gray-200">
          {files.map((rowData, rowIndex) => (
            <TableRow key={rowIndex} className="odd:bg-gray-50">
              <TableCell className="whitespace-nowrap px-4 py-2 text-gray-700">
                {rowData.fileName}
              </TableCell>
              <TableCell className="whitespace-nowrap px-4 py-2 text-gray-700">
                {formatDate(rowData._creationTime)}
              </TableCell>
              <TableCell className="whitespace-nowrap px-4 py-2 text-gray-700">
                {formatDate(rowData._creationTime)}
              </TableCell>
              <TableCell className="whitespace-nowrap px-4 py-2 text-gray-700">
                <Image
                  src={user?.picture || 'https://via.placeholder.com/30'}
                  alt="user"
                  width={30}
                  height={30}
                  className="rounded-full"
                  style={{ width: 'auto', height: 'auto' }}
                />
              </TableCell>
              <TableCell className="whitespace-nowrap px-4 py-2 text-gray-700">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem className="flex items-center justify-center gap-3">
                      <Archive className="h-4 w-4" />
                      <span>Archive</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FilesTable;
