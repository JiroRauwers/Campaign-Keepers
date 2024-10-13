export default function Page({ params }: { params: { any: string[] } }) {
  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <pre>{JSON.stringify(params, null, 2)}</pre>
    </div>
  );
}
