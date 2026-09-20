import React from 'react';

export const CardSkeleton: React.FC = () => {
  return (
    <div className="bg-white border border-[#e3e3df] rounded-2xl p-5 space-y-4 animate-pulse shadow-xs">
      <div className="flex gap-4 items-center">
        <div className="w-14 h-14 rounded-xl bg-[#f3f3ef]" />
        <div className="space-y-2 flex-1">
          <div className="h-5 bg-[#f3f3ef] rounded w-3/4" />
          <div className="h-3 bg-[#ebebeb] rounded w-1/2" />
        </div>
      </div>
      <div className="space-y-2 pt-2">
        <div className="h-3 bg-[#f3f3ef] rounded w-full" />
        <div className="h-3 bg-[#f3f3ef] rounded w-5/6" />
      </div>
      <div className="flex gap-2 pt-2">
        <div className="h-8 bg-[#f3f3ef] rounded-lg flex-1" />
        <div className="h-8 bg-[#f3f3ef] rounded-lg flex-1" />
      </div>
    </div>
  );
};

export const TableSkeleton: React.FC = () => {
  return (
    <div className="space-y-3 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-12 bg-white border border-[#e3e3df] rounded-xl" />
      ))}
    </div>
  );
};
