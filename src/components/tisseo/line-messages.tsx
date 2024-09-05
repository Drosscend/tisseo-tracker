import { InfoIcon } from "lucide-react";
import Markdown from "react-markdown";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LineDetails } from "@/lib/tisseo/fetch-line-details";

export function LineMessages({ line }: { line: LineDetails["line"] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Messages</CardTitle>
      </CardHeader>
      <CardContent>
        {line.messages && line.messages.length > 0 ? (
          line.messages.map((message, index) => (
            <Alert key={index} className="mb-4">
              <InfoIcon className="size-4" />
              <AlertTitle>{message.title}</AlertTitle>
              <AlertDescription>
                <Markdown>{message.content}</Markdown>
              </AlertDescription>
            </Alert>
          ))
        ) : (
          <p>Aucun message pour le moment.</p>
        )}
      </CardContent>
    </Card>
  );
}
