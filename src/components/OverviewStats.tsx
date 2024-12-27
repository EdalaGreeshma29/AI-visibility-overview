
"use client";

export default function OverviewStats() {
  const stats = [
    { title: "Brand Coverage", value: "11%", change: "-12.4%", progress: 11 },
    { title: "Prompts Tracked", value: "2113", change: "+2.02%", progress: 60 },
    { title: "Customer Segments", value: "54", change: "-2.02%", progress: 40 },
  ];

  // Function to generate the stroke-dasharray based on the progress
  function calculateDashArray(progress: number) {
    const circumference = 2 * Math.PI * 50; // 2  π  radius
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return { strokeDasharray, strokeDashoffset };
  }


  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-md text-left flex flex-col relative">
          <div className="flex-1">
            <h3 className="font-medium text-[#000]">{stat.title}</h3>
            <div className="relative">
              {stat.title === "Brand Coverage" && (
                <svg width="228" height="150" viewBox="0 0 120 60">
                  {/* {/ Background semi-circle /} */}
                  <path
                    d="M10,50 A50,50 0 0,1 110,50"
                    stroke="#e0e0e0"
                    strokeWidth="6"
                    fill="none"
                  />
                  {/* {/ Foreground progress semi-circle /} */}
                  <path
                    d="M10,50 A50,50 0 0,1 110,50"
                    stroke={stat.progress <= 50 ? "blue" : "green"}

                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: calculateDashArray(stat.progress).strokeDasharray,
                      strokeDashoffset: calculateDashArray(stat.progress).strokeDashoffset,
                      transition: "stroke-dashoffset 0.3s ease",
                    }}
                  />
                </svg>
              )}
            </div>
            <p
              className={`text-[30px] font-bold ${stat.title === "Brand Coverage" ? "text-center  absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-7%]" : ''}`}
            >
              {stat.value}
            </p>
          </div>
          <p
            className={`text-sm ${stat.change.startsWith("-") ? "text-red-500" : "text-green-500"}`}
          >
            <span className="p-1 rounded bg-green-100">  {stat.change} </span> <span className="text-[#000] ml-2">Last 30 Days</span>
          </p>
        </div>
      ))}
    </div>
  );
}
