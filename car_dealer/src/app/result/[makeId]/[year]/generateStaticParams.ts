export async function generateStaticParams() {
  const vehicleList = await fetch(
    "https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json"
  ).then((res) => res.json());

  const makes = vehicleList.Results.map(
    (make: { Make_ID: string; Make_Name: string }) => make.Make_ID
  );

  const years = generateYears(2015);

  const paths = makes.flatMap((makeId: string) =>
    years.map((year) => ({
      params: {
        makeId: String(makeId),
        year: String(year),
      },
    }))
  );

  return {
    paths,
    fallback: true,
  };
}

function generateYears(startYear: number) {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = startYear; year <= currentYear; year++) {
    years.push(year);
  }
  return years;
}
