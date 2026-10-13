export function NoticeBadge({ notice }) {
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    resolved: "bg-green-100 text-green-800",
  };

  return (
    <div
      className={`text-xs p-1.5 rounded-md mb-1.5 border border-l-4 border-gray-300 ${statusColors[notice.status]}`}
    >
      <div className="font-semibold">{notice.title}</div>
      <div className="text-[10px] opacity-80">{notice.dueDate}</div>
    </div>
  );
}