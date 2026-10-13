"use client";

import { useAppDispatch } from "@/store/hooks";
import { setTab } from "@/features/notices/noticesSlice";
import { useState } from "react";

export function NoticeHeader() {
  const dispatch = useAppDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const tabs = [
    { key: "calendar", label: "Calendar" },
    { key: "clients", label: "Clients" },
    { key: "gst", label: "GST Notices" },
    { key: "tds", label: "TDS Notices" },
    { key: "it", label: "IT Notices" },
    { key: "logs", label: "Logs" },
  ];

  return (
    <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-full bg-purple-100 flex-shrink-0">
          <svg className="h-5 w-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
        </div>
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-gray-900">Notice Management</h1>
          <p className="text-xs sm:text-sm text-gray-500">
            GST · Income Tax · TRACES — all portals unified
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="relative">
        <button
          className="lg:hidden flex items-center justify-between w-full px-3 py-2 text-sm border border-gray-300 rounded-md"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span>Calendar</span>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {menuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-md border border-gray-200 p-2 z-40 lg:hidden">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => { dispatch(setTab(tab.key)); setMenuOpen(false); }}
                className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
        <div className="hidden lg:flex items-center gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => dispatch(setTab(tab.key))}
              className="px-4 py-2 text-sm text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-md whitespace-nowrap"
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}