// components/LoadingSpinner.tsx

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="relative flex h-12 w-12 items-center justify-center">
        <div className="absolute h-full w-full animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"></div>
        <div className="h-6 w-6 rounded-full bg-blue-500"></div>
      </div>
    </div>
  );
}
