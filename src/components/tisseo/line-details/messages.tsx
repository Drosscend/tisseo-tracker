import type { Message } from "@/types/tisseo.type";
import { InfoIcon, TriangleAlertIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function Messages({ messages }: { messages: Message[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Messages</CardTitle>
      </CardHeader>
      <CardContent>
        {messages && messages.length > 0 ? (
          messages.map((message, index) => (
            <Alert key={index} className={cn("mb-2", message.importanceLevel === "important" ? "bg-red-100" : "bg-blue-100")}>
              {message.importanceLevel === "important" ? <TriangleAlertIcon className="size-4" /> : <InfoIcon className="size-4" />}
              <AlertTitle>{message.title}</AlertTitle>
              <AlertDescription dangerouslySetInnerHTML={{ __html: message.content }} />
            </Alert>
          ))
        ) : (
          <p>Aucun message pour le moment.</p>
        )}
      </CardContent>
    </Card>
  );
}
