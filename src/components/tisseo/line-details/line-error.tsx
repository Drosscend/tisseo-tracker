import { MapPinOffIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function LineError() {
  return (
    <Card className="mx-auto w-full max-w-6xl py-8">
      <CardContent>
        <div className="flex h-full flex-col items-center justify-center text-center">
          <MapPinOffIcon className="text-muted-foreground mb-8 size-24" />
          <h1 className="mb-2 text-4xl font-bold">{"Oups !"}</h1>
          <p className="text-muted-foreground mb-8 text-xl">{"Il semble que cette ligne n'existe pas sur notre plan."}</p>
          <Button asChild>
            <Link href="/">{"Retour à l'Accueil"}</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
