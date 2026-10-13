"use client";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectSearchQuery } from "@/features/notices/selectors";
import { setTab, setSearch } from "@/features/notices/noticesSlice";
import { useState } from "react";

export function TopNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector(selectSearchQuery);

  const navItems = ["Compliance", "WhatsApp", "Email", "Agents", "Chat"];

  return (
    <header className="border-b border-gray-200 bg-white px-4 py-2 flex items-center justify-between">
      {/* Mobile menu button */}
      <button
        className="lg:hidden p-2 text-gray-600"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Left: Brand + Nav */}
      <div className="flex items-center gap-4 lg:gap-6">
        <span className="font-bold text-indigo-600 text-sm lg:text-base">ABC Technolo...</span>
        <nav className="hidden lg:flex items-center gap-2">
          <button
            className="px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-md"
            onClick={() => dispatch(setTab("calendar"))}
          >
            Notices
          </button>
          {navItems.map((item) => (
            <button
              key={item}
              className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      {/* Mobile nav dropdown */}
      {menuOpen && (
        <div className="absolute top-14 left-4 bg-white shadow-lg rounded-md border border-gray-200 p-2 z-50 lg:hidden">
          {navItems.map((item) => (
            <button
              key={item}
              className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {/* Right: Search + Theme + Avatar */}
      <div className="flex items-center gap-2 lg:gap-3">
        <div className="relative hidden sm:block">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            placeholder="Search notices"
            className="w-48 lg:w-64 pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <svg
            className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <button
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-md sm:hidden"
          title="Search"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-md" title="Theme toggle">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        </button>
        <div className="relative">
          <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-semibold">
            JM
          </div>
          <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white" />
        </div>
      </div>
    </header>
  );
}