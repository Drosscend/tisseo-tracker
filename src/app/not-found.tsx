import { MapPinOffIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <MapPinOffIcon className="text-muted-foreground mb-8 size-24" />
      <h1 className="mb-2 text-4xl font-bold">{"404 - Page Non Trouvée"}</h1>
      <p className="text-muted-foreground mb-8 text-xl">{"Oups ! Il semble que cet arrêt de bus n'existe pas sur notre plan."}</p>
      <Button asChild>
        <Link href="/">{"Retour à l'Accueil"}</Link>
      </Button>
    </div>
  );
}
