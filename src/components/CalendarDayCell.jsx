import { NoticeBadge } from "./NoticeBadge";

export function CalendarDayCell({ cell }) {
  if (!cell.inCurrentMonth) {
    return (
      <div
        className="min-h-[80px] sm:min-h-[110px] border border-gray-200 p-1 opacity-30"
      />
    );
  }

  return (
    <div className="min-h-[80px] sm:min-h-[110px] border border-gray-200 p-1 flex flex-col">
      <div className="flex items-center justify-between">
        <span className="text-xs sm:text-sm font-medium text-gray-700">
          {cell.dateObj.getDate()}
        </span>
        {cell.isToday && (
          <span className="bg-indigo-600 text-white px-2 py-0.5 rounded-full text-xs">
            TODAY
          </span>
        )}
      </div>
      <div className="flex-1 overflow-y-auto">
        {cell.notices.map((notice) => (
          <NoticeBadge key={notice.id} notice={notice} />
        ))}
      </div>
    </div>
  );
}