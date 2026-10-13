"use client";

import { useAppSelector } from "@/store/hooks";
import { selectCalendarCells } from "@/features/notices/selectors";
import { CalendarDayCell } from "./CalendarDayCell";

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export function CalendarGrid() {
  const cells = useAppSelector(selectCalendarCells);

  return (
    <div className="px-2 sm:px-6 py-4 overflow-x-auto">
      <div className="min-w-[600px]">
        <div className="grid grid-cols-7 border-b border-gray-200 text-center py-2 text-xs font-semibold text-gray-500">
          {days.map((day) => (
            <div key={day} className="p-1">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 border-l border-t border-gray-200 min-h-[400px]">
          {cells.map((cell, i) => (
            <CalendarDayCell key={i} cell={cell} />
          ))}
        </div>
      </div>
    </div>
  );
}