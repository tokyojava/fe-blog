"use client";
import { useMemo, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { cn } from "@/lib/utils";

export type KeyValuePairGroup = {
    title: string;
    pairs: { label: string; value: string }[];
}

export interface SingleSelectProps {
    groups: KeyValuePairGroup[];
    placeholder: string;
    onChange?: (value: string) => void;
}
export function SingleSelect(props: SingleSelectProps) {
    const [value, setValue] = useState("");

    const [open, setOpen] = useState(false);
    const { groups, placeholder, onChange = () => { } } = props;
    const flattenedPairs = useMemo(() => groups.flatMap(group => group.pairs), [groups]);
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-48 justify-between"
                >
                    {value
                        ? flattenedPairs.find((f) => f.value === value)?.label
                        : placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-0">
                <Command>
                    <CommandInput placeholder="Search..." />
                    <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        {groups.map((group) => (
                            <CommandGroup key={group.title} heading={group.title}>
                                {group.pairs.map((pair) => (
                                    <CommandItem
                                        key={pair.value}
                                        value={pair.value}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue);
                                            setOpen(false);
                                            onChange(currentValue === value ? "" : currentValue);
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === pair.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {pair.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        ))}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
