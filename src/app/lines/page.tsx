import type { Metadata } from "next";
import LineSearch from "@/components/tisseo/line-search/line-search";
import { fetchLines } from "@/lib/tisseo/fetch-lines";

export const metadata: Metadata = {
  title: "Line Search",
  description: "Find real-time information about a Tisseo line.",
};

export default async function Page() {
  const lines = await fetchLines();

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-2">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-semibold">Recherche de ligne</h1>
        <p className="text-xl">Trouvez facilement votre ligne et accédez aux informations en temps réel</p>
      </div>
      <LineSearch lines={lines} />
    </div>
  );
}
