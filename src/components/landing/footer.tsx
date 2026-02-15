export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12 lg:px-8">
      <div className="mx-auto flex max-w-4xl items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 text-sm font-bold text-white">
            D
          </div>
          <span className="font-semibold">Diffshot</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Ship code. Share progress. Grow your audience.
        </p>
      </div>
    </footer>
  );
}
