'use client'
import { Activity } from "@/utils/types/types";
import React, { useState, useMemo, useEffect } from "react";

export default function ContributionGraph({ userId }: { userId: string }) {

  const currentYear = new Date().getFullYear();
  const availableYears = [
    currentYear - 2,
    currentYear - 1,
    currentYear,
    "Last 365 Days",
  ];

  const [selectedYear, setSelectedYear] = useState<string | number>("Last 365 Days");
  const [data, setData] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch activities
  useEffect(() => {
    if (!userId) return;
    const getActivity = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/activities/${userId}`,{
          method:'GET',
          cache:'no-store'
        });
        const json = await res.json();
        console.log("json",json)
        setData(json || []);
      } catch (err) {
        console.error("Activity Fetch Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    getActivity();
  }, [userId]);


  const filteredData = useMemo(() => {
    if (selectedYear === "Last 365 Days") return data;
    return data.filter((a) => {
      const d = new Date(a.date);
      return d.getFullYear() === selectedYear;
    });
  }, [data, selectedYear]);
  if (!userId) return <ContributionSkeleton />
  if (isLoading) return <ContributionSkeleton />

  // Filter

  // Map
  const activityMap: Record<string, number> = {};
  filteredData.forEach((a) => {
    const day = new Date(a.date).toISOString().split("T")[0];
    activityMap[day] = a.count;
  });

  // Generate days
  const days: Date[] = [];
  if (selectedYear === "Last 365 Days") {
    const today = new Date();
    for (let i = 365; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      days.push(d);
    }
  } else {
    const start = new Date(Number(selectedYear), 0, 1);
    const end = new Date(Number(selectedYear), 11, 31);
    const totalDays =
      Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    for (let i = 0; i < totalDays; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      days.push(d);
    }
  }

  // Group weeks
  const weeks: Date[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  // Month labels
  const monthLabels = weeks.map((week, i) => {
    const firstDay = week[0];
    if (!firstDay) return "";

    const monthName = firstDay.toLocaleString("en-US", { month: "short" });

    if (i === 0) return monthName;

    const prevWeek = weeks[i - 1][0];
    return prevWeek.getMonth() !== firstDay.getMonth() ? monthName : "";
  });

  const getColor = (count: number) => {
    if (count === 0) return "bg-gray-800";
    if (count == 1) return "bg-green-800";
    if (count <= 2) return "bg-green-700";
    if (count <= 4) return "bg-green-600";
    if (count <= 7) return "bg-green-400";
    return "bg-green-200";
  };

  return (
    <div className="p-4 bg-[#0f172a] rounded-lg w-full ">
      {/* Year Selector */}
      <div className="mb-3 flex justify-between items-center">
        <h2 className="text-white text-sm">Contribution Activity</h2>

        <select
          value={selectedYear}
          onChange={(e) =>
            setSelectedYear(
              e.target.value === "Last 365 Days"
                ? "Last 365 Days"
                : Number(e.target.value)
            )
          }
          className="bg-slate-800 text-white p-2 rounded-md border border-gray-700"
        >
          {availableYears.map((yr, i) => (
            <option key={i} value={yr}>
              {yr === "Last 365 Days" ? "Latest 1 Year" : yr}
            </option>
          ))}
        </select>
      </div>

      {/* Month labels
      <div className="flex ml-6 mb-2 text-xs justify-start text-gray-300 gap-[10px]">
        {monthLabels.map((label, i) => (
          <div key={i} className="w-4 text-center">
            {label}
          </div>
        ))}
      </div> */}

      {/* Heatmap */}
      <div className="flex ">
        <div className="flex w-full justify-end overflow-auto">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px] mx-[2px]">
              {week.map((day, di) => {
                const key = day.toISOString().split("T")[0];
                const count = activityMap[key] || 0;
                return (
                  <div
                    key={di}
                    className={`w-[14px] h-[14px] rounded-sm ${getColor(count)} duration-300 hover:scale-125 cursor-pointer`}
                    title={`${key}: ${count}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Skeleton Loader
export function ContributionSkeleton() {
  return (
    <div className="h-[150px] bg-slate-800 rounded-lg animate-pulse" />
  );
}
