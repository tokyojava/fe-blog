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
};

export interface CommandedBasedSelectProps {
    groups: KeyValuePairGroup[];
    placeholder: string;
    multiple?: boolean;
    onChange?: (value: string | string[]) => void;
}

export function CommandedBasedSelect(props: CommandedBasedSelectProps) {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const [open, setOpen] = useState(false);

    const { groups, placeholder, multiple = false, onChange = () => {} } = props;
    const flattenedPairs = useMemo(() => groups.flatMap((group) => group.pairs), [groups]);

    const handleSelect = (currentValue: string) => {
        if (multiple) {
            const newValues = selectedValues.includes(currentValue)
                ? selectedValues.filter((value) => value !== currentValue)
                : [...selectedValues, currentValue];
            setSelectedValues(newValues);
            onChange(newValues);
        } else {
            const newValue = currentValue === selectedValues[0] ? "" : currentValue;
            setSelectedValues(newValue ? [newValue] : []);
            setOpen(false);
            onChange(newValue);
        }
    };

    const displayValue = multiple
        ? selectedValues.map((value) => flattenedPairs.find((f) => f.value === value)?.label).join(", ")
        : flattenedPairs.find((f) => f.value === selectedValues[0])?.label;

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-48 justify-between overflow-hidden"
                >
                    {displayValue || placeholder}
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
                                        onSelect={() => handleSelect(pair.value)}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                selectedValues.includes(pair.value) ? "opacity-100" : "opacity-0"
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
