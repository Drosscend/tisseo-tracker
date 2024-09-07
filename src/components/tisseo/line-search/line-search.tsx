"use client";

import type { Line } from "@/types/tisseo.type";
import { CheckIcon, ChevronsUpDownIcon, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TisseoIcon } from "@/components/tisseo/icon";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export default function LineSearch({ lines }: { lines: Line[] }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const router = useRouter();

  const getDisplayText = (line: Line | undefined) => {
    return line ? `${line.shortName} - ${line.name}` : "Rechercher une ligne...";
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-16 w-full justify-between rounded-lg border border-gray-300 bg-white px-4 py-2 text-left shadow-sm transition-all duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          <div className="flex items-center overflow-hidden">
            <SearchIcon className="mr-2 size-5 shrink-0 text-gray-400" />
            <span className="truncate text-lg text-gray-700">{getDisplayText(lines.find((line) => line.id === value))}</span>
          </div>
          <ChevronsUpDownIcon className="ml-2 size-5 shrink-0 text-gray-400" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" style={{ width: "var(--radix-popover-trigger-width)" }}>
        <Command className="w-full">
          <CommandInput placeholder="Tapez pour rechercher..." className="h-12 text-lg" />
          <CommandList className="max-h-[300px] overflow-y-auto">
            <CommandEmpty>Aucune ligne trouvée.</CommandEmpty>
            <CommandGroup>
              {lines.map((line) => (
                <CommandItem
                  key={line.id}
                  value={`${line.shortName} ${line.name}`}
                  onSelect={() => {
                    setValue(line.id);
                    setOpen(false);
                    router.push(`/lines/${line.id}`);
                  }}
                  className="cursor-pointer px-4 py-3 hover:bg-gray-100"
                >
                  <div className="flex w-full items-center overflow-hidden">
                    <CheckIcon className={cn("mr-2 size-5 shrink-0", value === line.id ? "opacity-100" : "opacity-0")} />
                    <TisseoIcon mode={line.transportMode.name} color={line.bgXmlColor} className="mr-3 size-6 shrink-0" />
                    <span className="truncate text-lg font-medium">{getDisplayText(line)}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
