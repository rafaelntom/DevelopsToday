import { Suspense, useEffect, useState } from "react";

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-900">
    <div className="text-white">Loading...</div>
  </div>
);

const ResultPage = async ({
  params,
}: {
  params: Promise<{ makeId: string; year: string }>;
}) => {
  const { makeId, year } = await params;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-slate-600 p-8 rounded shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Vehicle Information</h1>
        <Suspense fallback={<LoadingSpinner />}>
          <p className="text-lg">Make ID: {makeId}</p>
          <p className="text-lg">Model Year: {year}</p>
        </Suspense>
      </div>
    </div>
  );
};

export default ResultPage;
