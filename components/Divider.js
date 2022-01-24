function Dot() {
  return <div className="h-1 w-1 rounded-sm bg-gray-300" />;
}

export default function Divider() {
  return (
    <div className="grid content-center justify-center py-28">
      <div className="flex gap-1">
        <Dot />
        <Dot />
        <Dot />
      </div>
    </div>
  );
}
