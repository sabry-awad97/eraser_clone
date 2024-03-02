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
import { useEffect, useMemo, useRef } from 'react';
import { toast } from 'sonner';

const generateDynamicId = (length: number) => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

interface Props {
  isDocumentSaved: boolean;
  file: File | null;
  onSave: () => void;
}

const Editor: React.FC<Props> = ({ isDocumentSaved, file, onSave }) => {
  const editorRef = useRef<EditorJS | null>(null);
  const updateDocument = useMutation(api.file.updateDocument);

  const rawDocument = useMemo(
    () => ({
      time: Date.now(),
      blocks: [
        {
          data: {
            text: file?.fileName,
            level: 2,
          },
          id: generateDynamicId(9),
          type: 'header',
        },
        {
          data: {
            level: 4,
          },
          id: generateDynamicId(9),
          type: 'header',
        },
      ],
      version: '2.29.0',
    }),
    [file?.fileName],
  );

  useEffect(() => {
    const initEditor = () => {
      if (editorRef.current) {
        editorRef.current.destroy();
      }

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
  }, [file, rawDocument]);

  useEffect(() => {
    const saveDocument = async () => {
      try {
        const outputData = await editorRef.current?.save();
        if (file && outputData) {
          await updateDocument({
            _id: file._id,
            document: JSON.stringify(outputData),
          });
          onSave();
          toast('File Updated Successfully.');
        }
      } catch (error) {
        console.error('Error while saving document:', error);
        toast('Error while saving document.');
      }
    };

    if (isDocumentSaved) {
      saveDocument();
    }
  }, [isDocumentSaved, file?._id, onSave]);

  return <div id="editorjs" className="ml-20" />;
};

export default Editor;
