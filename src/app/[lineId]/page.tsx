export default async function LineDetail({ params }: { params: { lineId: string } }) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="bg-muted/40 flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Ligne {params.lineId}</h1>
        </div>
      </main>
    </div>
  );
}
