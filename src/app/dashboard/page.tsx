"use client";

import React from "react";

const Dashboard = () => {
  // Sample data for the dashboard
  const statistics = [
    { label: "Total Users", value: "1,245" },
    { label: "Orders", value: "567" },
    { label: "Revenue", value: "$12,345" },
    { label: "Products", value: "245" },
  ];

  const recentActivities = [
    "User John placed an order.",
    "Product ABC was added.",
    "Revenue crossed $10,000.",
    "User Lisa updated her profile.",
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Dashboard</h1>

      {/* Statistics Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        {statistics.map((stat, index) => (
          <div
            key={index}
            style={{
              flex: 1,
              background: "#f8f9fa",
              padding: "20px",
              borderRadius: "8px",
              textAlign: "center",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ margin: 0 }}>{stat.value}</h2>
            <p style={{ margin: 0, color: "#6c757d" }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Activities Section */}
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h3 style={{ marginBottom: "10px" }}>Recent Activities</h3>
        <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
          {recentActivities.map((activity, index) => (
            <li
              key={index}
              style={{
                padding: "10px 0",
                borderBottom: "1px solid #e9ecef",
                color: "#495057",
              }}
            >
              {activity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
