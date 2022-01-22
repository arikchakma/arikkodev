function Dot() {
  return <div className="w-1 h-1 rounded-sm bg-gray-300" />;
}

export default function Divider() {
  return (
    <div className="grid justify-center content-center py-28">
      <div className="flex gap-1">
        <Dot />
        <Dot />
        <Dot />
      </div>
    </div>
  );
}
