function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center text-center infodash">
      <p className="font-bold text-2xl text-red-700 dark:text-red-500">Error</p>
      <p className="font-black text-7xl text-red-700 dark:text-red-500">404</p>
      <div className="flex justify-center items-center gap-1 mt-2 flex-wrap">
        <p>Page Not Found</p>
        <p>NOT FOUND</p>
      </div>
    </div>
  );
}