"use client";
import { Vehicle } from "@/app/page";
import { Suspense, useEffect, useState } from "react";

// Loading Spinner Component with improved styling
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-900">
    <div className="flex items-center justify-center space-x-2 text-white">
      <div className="w-8 h-8 border-4 border-t-4 border-white rounded-full animate-spin"></div>
      <span>Loading...</span>
    </div>
  </div>
);

const ResultPage = ({ params }: { params: { makeId: string; year: string } }) => {
  const { makeId, year } = params;

  const [vehicleModels, setVehicleModels] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicleModels = async () => {
      try {
        const response = await fetch(
          `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
        );
        console.log(response);
        const data = await response.json();
        if (data.Results) {
          setVehicleModels(data.Results);
        } else {
          setError("No models found for this make and year.");
        }
      } catch (err) {
        setError("Failed to fetch vehicle data.");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleModels();
  }, [makeId, year]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="bg-red-600 text-white p-4 rounded-lg shadow-lg text-lg font-semibold">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800 text-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-3xl font-extrabold mb-6 text-center">Vehicle Information</h1>

        <Suspense fallback={<LoadingSpinner />}>
          <section className="flex flex-col gap-6">
            <div className="bg-slate-700 p-4 rounded-md">
              <p className="text-lg font-semibold">
                Make Name: {!loading && vehicleModels ? vehicleModels[0].Make_Name : ""}
              </p>
              <p className="text-lg font-semibold">Model Year: {year}</p>
            </div>

            <div className="mt-4">
              <h2 className="text-2xl font-semibold mb-4">Available Models</h2>
              {vehicleModels.length > 0 ? (
                <ul className="list-disc pl-6 space-y-4">
                  {vehicleModels.map((model: any, index: number) => (
                    <li
                      key={index}
                      className="text-lg text-slate-200 hover:text-blue-400 transition duration-200"
                    >
                      {model.Model_Name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-lg text-slate-300">
                  No models available for this make and year.
                </p>
              )}
            </div>
          </section>
        </Suspense>
      </div>
    </div>
  );
};

export default ResultPage;
