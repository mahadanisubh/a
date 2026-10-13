"use client";

import { TopNavbar } from "@/components/TopNavbar";
import { NoticeHeader } from "@/components/NoticeHeader";
import { CalendarControls } from "@/components/CalendarControls";
import { CalendarGrid } from "@/components/CalendarGrid";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <TopNavbar />
      <NoticeHeader />
      <CalendarControls />
      <CalendarGrid />
    </div>
  );
}