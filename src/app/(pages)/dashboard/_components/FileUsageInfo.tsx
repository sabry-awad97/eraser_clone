import React from 'react';

interface Props {
  usedFiles: number;
  maxFiles: number;
}

const FileUsageInfo: React.FC<Props> = ({ usedFiles, maxFiles }) => {
  const percentage = (usedFiles / maxFiles) * 100;

  return (
    <>
      <div className="mt-5 h-4 w-full rounded-full bg-gray-200">
        <div
          className="h-4 rounded-full bg-blue-600"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div>
        <p className="mt-3 text-[12px]">
          <strong>{usedFiles}</strong> out of <strong>{maxFiles}</strong> files
          used
        </p>
        <p className="mt-1 text-[12px]">
          Upgrade your plan for unlimited access.
        </p>
      </div>
    </>
  );
};

export default FileUsageInfo;
