"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export interface Vehicle {
  MakeId: number;
  MakeName: string;
  VehicleTypeId: number;
  VehicleTypeName: string;
}

const Home = () => {
  const [makes, setMakes] = useState<Vehicle[]>([]);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    async function fetchMakes() {
      try {
        const response = await fetch(
          "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
        );
        const data = await response.json();
        setMakes(data.Results);
      } catch (error) {
        console.error("Error fetching makes:", error);
      }
    }

    fetchMakes();
  }, []);

  function generateYears(startYear: number) {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = startYear; year <= currentYear; year++) {
      years.push(year);
    }
    return years;
  }

  const years = generateYears(2015);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-slate-900 p-4">
      <h1 className="text-2xl font-bold mb-6">Develops Today Vehicle Filter</h1>
      <div className="space-y-4 flex flex-col">
        <div className="mb-4">
          <label className="block font-medium mb-2">Select Vehicle Make:</label>
          <select
            className="w-full p-2 border rounded text-slate-700"
            value={selectedMake}
            onChange={(e) => setSelectedMake(e.target.value)}
          >
            <option value="">Select a Make</option>
            {makes.map((make) => (
              <option key={make.MakeId} value={make.MakeName} className="text-slate-700">
                {make.MakeName}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col mb-4">
          <label className="block font-medium mb-2 ">Select Model Year:</label>
          <select
            className="w-full p-2 border rounded text-slate-700"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">Select a Year</option>
            {years.map((year) => (
              <option className="text-slate-700" key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <Link href={`/result/${selectedMake}/${selectedYear}`} passHref className="mt-7">
          <button
            className={`w-full p-2 bg-blue-500 text-white rounded ${
              !selectedMake || !selectedYear ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!selectedMake || !selectedYear}
          >
            Next
          </button>
        </Link>
      </div>
    </main>
  );
};

export default Home;
