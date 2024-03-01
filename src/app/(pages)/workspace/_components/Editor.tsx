'use client';

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { File } from '@/convex/file';
import Checklist from '@editorjs/checklist';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import Warning from '@editorjs/warning';
import { useMutation } from 'convex/react';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

const rawDocument = {
  time: 1550476186479,
  blocks: [
    {
      data: {
        text: 'Document Name',
        level: 2,
      },
      id: '123',
      type: 'header',
    },
    {
      data: {
        level: 4,
      },
      id: '1234',
      type: 'header',
    },
  ],
  version: '2.8.1',
};

interface Props {
  isSaved: boolean;
  fileId: Id<'files'>;
  file: File | null;
}

const Editor: React.FC<Props> = ({ isSaved, fileId, file }) => {
  const editorRef = useRef<EditorJS | null>(null);
  const updateDocument = useMutation(api.file.updateDocument);

  useEffect(() => {
    const initEditor = () => {
      editorRef.current = new EditorJS({
        holder: 'editorjs',
        tools: {
          header: {
            class: Header,
            shortcut: 'CMD+SHIFT+H',
            config: {
              placeholder: 'Enter a Header',
            },
          },
          list: {
            class: List,
            inlineToolbar: true,
            config: {
              defaultStyle: 'unordered',
            },
          },
          checklist: {
            class: Checklist,
            inlineToolbar: true,
          },
          paragraph: Paragraph,
          warning: Warning,
        },
        data: file?.document ? JSON.parse(file.document) : rawDocument,
      });
    };

    if (file) {
      initEditor();
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
      }
    };
  }, [file]);

  useEffect(() => {
    const saveDocument = async () => {
      try {
        const outputData = await editorRef.current?.save();
        if (outputData) {
          await updateDocument({
            _id: fileId,
            document: JSON.stringify(outputData),
          });
          toast('Document Updated!');
        }
      } catch (error) {
        console.error('Error while saving document:', error);
        toast('Error while saving document.');
      }
    };

    if (isSaved) {
      saveDocument();
    }
  }, [isSaved]);

  return <div id="editorjs" className="ml-20" />;
};

export default Editor;
