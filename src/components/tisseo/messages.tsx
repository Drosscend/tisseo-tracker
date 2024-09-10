import type { Message } from "@/types/tisseo.type";
import { InfoIcon, TriangleAlertIcon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export function Messages({ messages }: { messages: Message[] }) {
  return (
    <Accordion type="multiple" className="w-full space-y-2">
      {messages &&
        messages.length > 0 &&
        messages.map((message, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className={cn(
              "rounded-xl border shadow",
              message.importanceLevel === "important" ? "bg-red-100 dark:bg-red-900" : "bg-blue-100 dark:bg-blue-900"
            )}
          >
            <AccordionTrigger className="flex space-y-1.5 p-6 hover:no-underline">
              <div className="flex items-center space-x-2 text-left font-semibold leading-none tracking-tight">
                {message.importanceLevel === "important" ? (
                  <TriangleAlertIcon className="size-4 shrink-0" />
                ) : (
                  <InfoIcon className="size-4 shrink-0" />
                )}
                <span>{message.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="p-6 pt-0" dangerouslySetInnerHTML={{ __html: message.content }} />
            </AccordionContent>
          </AccordionItem>
        ))}
    </Accordion>
  );
}
