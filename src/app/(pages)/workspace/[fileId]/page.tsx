'use client';

import WorkspaceHeader from '../_components/WorkspaceHeader';

interface Props {
  params: { fileId?: string };
}

const WorkspaceFilePage = ({ params }: Props) => {
  return (
    <div>
      <WorkspaceHeader
        onSave={() => {
          console.log('save');
        }}
      />
    </div>
  );
};

export default WorkspaceFilePage;
