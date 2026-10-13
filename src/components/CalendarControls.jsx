"use client";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectCurrentDate, selectFilters } from "@/features/notices/selectors";
import { nextMonth, prevMonth, setStatus, setNoticeBy, setType } from "@/features/notices/noticesSlice";

export function CalendarControls() {
  const dispatch = useAppDispatch();
  const currentDate = useAppSelector(selectCurrentDate);
  const filters = useAppSelector(selectFilters);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const types = ["all", "gst", "income_tax", "tds"];

  return (
    <div className="px-4 sm:px-6 py-3 border-b border-gray-200 bg-gray-50">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Left: Date Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => dispatch(prevMonth())}
            className="p-1.5 border border-gray-300 rounded-md hover:bg-gray-100"
          >
            <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-sm font-medium text-gray-700 min-w-[100px] text-center">
            {monthNames[currentDate.month]} {currentDate.year}
          </span>
          <button
            onClick={() => dispatch(nextMonth())}
            className="p-1.5 border border-gray-300 rounded-md hover:bg-gray-100"
          >
            <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Right: Filters - All in same row */}
        <div className="flex items-center flex-wrap gap-3">
          {/* Status */}
          <select
            value={filters.status}
            onChange={(e) => dispatch(setStatus(e.target.value))}
            className="px-2 py-1.5 text-sm border border-gray-300 rounded-md whitespace-nowrap"
          >
            <option value="all">All statuses</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
          </select>

          {/* Notice By */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => dispatch(setNoticeBy("notice_date"))}
              className={`px-3 py-1.5 text-sm rounded-md whitespace-nowrap ${filters.noticeBy === "notice_date" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"}`}
            >
              Notice Date
            </button>
            <button
              onClick={() => dispatch(setNoticeBy("due_date"))}
              className={`px-3 py-1.5 text-sm rounded-md whitespace-nowrap ${filters.noticeBy === "due_date" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"}`}
            >
              Due Date
            </button>
          </div>

          {/* Type Pills */}
          <div className="flex items-center gap-1 overflow-x-auto">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => dispatch(setType(type))}
                className={`px-3 py-1.5 text-sm rounded-md whitespace-nowrap ${filters.type === type ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"}`}
              >
                {type === "income_tax" ? "income tax" : type}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}