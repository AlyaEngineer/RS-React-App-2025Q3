export default function CharacterSkeleton() {
  return (
    <div
      role="presentation"
      aria-label="Loading character preview"
      className="bg-item-card/80 flex h-full animate-pulse items-center rounded-md p-4 max-md:p-2.5"
    >
      <div className="dark:bg-text-content-2 bg-text-content-2 h-24 w-24 flex-shrink-0 rounded-md" />
      <div className="ml-4 flex w-full flex-col space-y-2">
        <div className="dark:bg-text-content-2 bg-text-content-2 h-5 w-1/2 rounded" />
        <div className="dark:bg-text-content-2 bg-text-content-2 h-4 w-1/3 rounded" />
        <div className="dark:bg-text-content-2 bg-text-content-2 h-4 w-1/4 rounded" />
      </div>
    </div>
  );
}
