'use client';

import { api } from '@/convex/_generated/api';
import { File } from '@/convex/file';
import { Excalidraw, MainMenu, WelcomeScreen } from '@excalidraw/excalidraw';
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import { useMutation } from 'convex/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface CanvasProps {
  isDocumentSaved: boolean;
  file: File | null;
}

const Canvas = ({ isDocumentSaved, file }: CanvasProps) => {
  const [whiteboardData, setWhiteboardData] =
    useState<readonly ExcalidrawElement[]>();

  const updateWhiteboard = useMutation(api.file.updateWhiteboard);

  useEffect(() => {
    const saveWhiteboard = async () => {
      if (!file?._id) return;

      try {
        await updateWhiteboard({
          _id: file._id,
          whiteboard: JSON.stringify(whiteboardData),
        });
      } catch (error) {
        toast('Error saving whiteboard.');
        console.error('Error saving whiteboard:', error);
      }
    };

    if (isDocumentSaved) {
      saveWhiteboard();
    }
  }, [isDocumentSaved]);

  return (
    <div className="h-screen w-full">
      {file && (
        <Excalidraw
          theme="light"
          initialData={{
            elements: file.whiteboard && JSON.parse(file.whiteboard),
          }}
          onChange={(excalidrawElements, appState, files) =>
            setWhiteboardData(excalidrawElements)
          }
          UIOptions={{
            canvasActions: {
              saveToActiveFile: false,
              loadScene: false,
              export: false,
              toggleTheme: false,
            },
          }}
        >
          <MainMenu>
            <MainMenu.DefaultItems.ClearCanvas />
            <MainMenu.DefaultItems.SaveAsImage />
            <MainMenu.DefaultItems.ChangeCanvasBackground />
          </MainMenu>
          <WelcomeScreen>
            <WelcomeScreen.Hints.MenuHint />
            <WelcomeScreen.Hints.MenuHint />
            <WelcomeScreen.Hints.ToolbarHint />
            <WelcomeScreen.Center>
              <WelcomeScreen.Center.MenuItemHelp />
            </WelcomeScreen.Center>
          </WelcomeScreen>
        </Excalidraw>
      )}
    </div>
  );
};

export default Canvas;
