import type { Metadata } from "next";
import { Suspense } from "react";
import { getLineData } from "@/components/tisseo/line-details/get-line-data.action";
import LineDetail from "@/components/tisseo/line-details/line-detail";
import { LineDetailFallback } from "@/components/tisseo/line-details/line-detail-fallback";
import { LineError } from "@/components/tisseo/line-details/line-error";

export async function generateMetadata({ params }: { params: { lineId: string } }): Promise<Metadata> {
  const lineId = decodeURIComponent(params.lineId);
  const data = await getLineData(lineId);
  if (!data) {
    return {
      title: "Ligne inconnue",
    };
  }

  return {
    title: `Ligne ${data.line.shortName} - ${data.line.name}`,
  };
}

async function LineDetailWrapper({ lineId }: { lineId: string }) {
  const data = await getLineData(lineId);

  if (!data) {
    return <LineError />;
  }

  return <LineDetail lineId={lineId} />;
}

export default function Page({ params }: { params: { lineId: string } }) {
  const lineId = decodeURIComponent(params.lineId);

  return (
    <Suspense fallback={<LineDetailFallback />}>
      <LineDetailWrapper lineId={lineId} />
    </Suspense>
  );
}
