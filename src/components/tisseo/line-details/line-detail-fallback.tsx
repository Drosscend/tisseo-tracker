import { formatDistanceToNowStrict, isSameMinute } from "date-fns";
import { format } from "date-fns/format";
import { fr } from "date-fns/locale/fr";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function LineDetailFallback() {
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-2">
      <div className="flex items-center justify-between">
        <h1 className="flex text-3xl font-semibold">
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="ml-2 h-8 w-64" />
        </h1>
        <Skeleton className="h-5 w-64" />
      </div>
      <Tabs defaultValue="infos" className="w-full">
        <TabsList>
          <TabsTrigger value="infos">Infos</TabsTrigger>
          <TabsTrigger value="stops">Arrêts et Horaires</TabsTrigger>
          <TabsTrigger value="map">Carte</TabsTrigger>
        </TabsList>
        <TabsContent value="infos" className="flex flex-col gap-2">
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-6 w-32" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="mb-2 h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-6 w-40" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="mb-2 h-4 w-full" />
              <Skeleton className="mb-2 h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="stops">
          <Card>
            <CardHeader>
              <CardTitle>Arrêts et Horaires</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                {[...Array(10)].map((_, index) => (
                  <div key={index} className="mb-6">
                    <h3 className="mb-2 text-lg font-semibold">
                      <Skeleton className="h-6 w-60" />
                    </h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Heure</TableHead>
                          <TableHead>{"Temps d'attente"}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[...Array(3)].map((_, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <Skeleton className="h-4 w-16" />
                            </TableCell>
                            <TableCell>
                              <Skeleton className="h-4 w-16" />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="map">
          <Skeleton className="h-[600px] w-full" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
