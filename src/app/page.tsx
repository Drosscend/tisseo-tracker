import { fetchLines } from "@/lib/tisseo/fetch-lines";
import LinesTable from "../components/tisseo/lines-table";

export default async function Home() {
  const data = await fetchLines();
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-2">
      <h1 className="text-3xl font-semibold">Home</h1>
      <LinesTable lines={data} />
    </div>
  );
}
