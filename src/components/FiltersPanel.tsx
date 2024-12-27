"use client";

import React, { useState } from "react";

// Function to get current date in "yyyy-mm-dd" format
const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// FiltersPanel Component
function FiltersPanel({ onUpdateDateRange }: { onUpdateDateRange: (start: string, end: string) => void }) {
  const currentDate = getCurrentDate();
  const [startDate, setStartDate] = useState(currentDate);
  const [endDate, setEndDate] = useState(currentDate);

  // Function to handle date range update
  const handleUpdate = () => {
    onUpdateDateRange(startDate, endDate);
  };

  return (
    <div className="bg-white border rounded-lg shadow-lg p-4 w-full md:w-64">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Filters</h2>

      {/* Date Range */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-600">Date Range</h3>
        <div className="space-y-2 mt-2">
          <label>
            Start Date
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md focus:outline-gray-400"
            />
          </label>
          <label>
            End Date
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md focus:outline-gray-400"
            />
          </label>
        </div>
        <button
          onClick={handleUpdate}
          className="mt-3 w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600"
        >
          Update Date Range
        </button>
      </div>

      {/* Selected Models */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-600">Selected Models</h3>
        <ul className="mt-2 space-y-2">
          <li>
            <input type="checkbox" id="model1" defaultChecked /> ChatGPT 4.1
          </li>
          <li>
            <input type="checkbox" id="model2" defaultChecked /> Gemini
          </li>
          <li>
            <input type="checkbox" id="model3" defaultChecked /> Lama 5.2
          </li>
          <li className="text-red-500">Deprecated: Lama 1.0</li>
        </ul>
        <button className="mt-3 w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600">
          Update Models Used
        </button>
      </div>

      {/* Global Filters */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-600">Global Filters</h3>
        <div className="mt-2 space-y-2">
          <select className="w-full p-2 border rounded-md focus:outline-blue-400">
            <option>Brands</option>
          </select>
          <select className="w-full p-2 border rounded-md focus:outline-blue-400">
            <option>Market Segments</option>
          </select>
          <select className="w-full p-2 border rounded-md focus:outline-blue-400">
            <option>Attributes</option>
          </select>
        </div>
        <button className="mt-3 w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600">
          Update Page Results
        </button>
      </div>

      {/* Saved Filter Sets */}
      <div>
        <h3 className="font-medium text-gray-600">Saved Filter Sets</h3>
        <ul className="mt-2 space-y-2 text-gray-700">
          <li>2024/02 - My Favorite Set</li>
        </ul>
      </div>
    </div>
  );
}

export default FiltersPanel;
