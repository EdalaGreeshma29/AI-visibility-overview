"use client";

import { useEffect, useState } from "react";
import FiltersPanel from "../components/FiltersPanel";
import OverviewStats from "../components/OverviewStats";
import ChartPanel from "../components/ChartPanel";
import { FaSignal } from "react-icons/fa";
import Sidebar from "@/components/SideBarMenu";

// Function to get current date in "yyyy-mm-dd" format
const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function Home() {
  const currentDate = getCurrentDate();

  // State for date range
  const [dateRange, setDateRange] = useState({ start: currentDate, end: currentDate });

  // Function to update date range
  const handleUpdateDateRange = (start: string, end: string) => {
    setDateRange({ start, end });
  };

  return (
    <div className="flex">
      {/* <Sidebar /> */}
      <aside className="bg-gray-100 flex p-4" style={{ paddingTop: 0 }}>
        <FiltersPanel onUpdateDateRange={handleUpdateDateRange} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-6 py-4 bg-gray-50">
        <h1 className="text-xl font-bold mb-3">AI Visibility Overview</h1>
        <hr className="mb-4" />

        {/* Constant Date Display */}
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md mb-4">
          <p className="font-semibold">
            {dateRange.start === dateRange.end
              ? `Date: ${dateRange.start}`
              : `Date: ${dateRange.start} to ${dateRange.end}`}
          </p>
        </div>

        <OverviewStats />
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
          <p className="font-bold">Miro vs. Competitors Snapshot</p>
          <ChartPanel />
        </div>
      </main>
    </div>
  );
}
