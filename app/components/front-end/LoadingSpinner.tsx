'use client';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center w-full h-64">
      <div className="relative">
        <div className="w-12 h-12 rounded-full absolute border-4 border-solid border-gray-200"></div>
        <div className="w-12 h-12 rounded-full animate-spin absolute border-4 border-solid border-primary border-t-transparent shadow-md"></div>
      </div>
    </div>
  );
}