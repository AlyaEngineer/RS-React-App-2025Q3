export default function CharacterSkeleton() {
  return (
    <div
      role="presentation"
      aria-label="Loading character preview"
      className="flex h-full animate-pulse items-center rounded-md bg-slate-700/80 p-4 max-md:p-2.5"
    >
      <div className="h-24 w-24 flex-shrink-0 rounded-md bg-slate-500/40" />
      <div className="ml-4 flex w-full flex-col space-y-2">
        <div className="h-5 w-1/2 rounded bg-slate-500/30" />
        <div className="h-4 w-1/3 rounded bg-slate-500/30" />
        <div className="h-4 w-1/4 rounded bg-slate-500/30" />
        <div className="h-4 w-1/2 rounded bg-slate-500/30" />
      </div>
    </div>
  );
}
