import { FieldValues, Path, useForm } from "react-hook-form";
import { Field } from "./field";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Input } from "./input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "./button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Textarea } from "./textarea";
import { RadioGroup, RadioGroupItem } from "./radio-group";

type MyBaseFormFieldProps<T extends FieldValues> = {
    form: ReturnType<typeof useForm<T>>;
    name: Path<T>;
    label?: string;
    noLabel?: boolean;
    className?: string;
}

type MyInputFormFieldProps<T extends FieldValues> = MyBaseFormFieldProps<T> & {
    placeholder?: string;
}

type MyTextAreaFormFieldProps<T extends FieldValues> = MyBaseFormFieldProps<T> & {
    placeholder?: string;
}


type MyRadioGroupFormFieldProps<T extends FieldValues> = MyBaseFormFieldProps<T> & {
    options: { label: string; value: string }[];
}

type KeyValuePairGroup = {
    title: string;
    pairs: { label: string; value: string }[];
}

type MySelectFormFieldProps<T extends FieldValues> = MyBaseFormFieldProps<T> & {
    placeholder?: string;
    groups: KeyValuePairGroup[];
}

export function MyInputFormField<T extends FieldValues>({ form, name, label, placeholder }: MyInputFormFieldProps<T>) {
    return (
        <Field>
            <FormField
                control={form.control}
                name={name}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            <Input placeholder={placeholder} {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </Field>
    )
}

export function MyTextAreaFormField<T extends FieldValues>({ className, noLabel, form, name, label, placeholder }: MyTextAreaFormFieldProps<T>) {
    return (
        <Field>
            <FormField
                control={form.control}
                name={name}
                render={({ field }) => (
                    <FormItem>
                        {noLabel ? null : <FormLabel>{label}</FormLabel>}
                        <FormControl>
                            <Textarea className={className} placeholder={placeholder} {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </Field>
    )
}

// export function MySelectFormField<T extends FieldValues>({ form, name, label, placeholder, keyValuePairs }: MySelectFormFieldProps<T>) {
//     return (
//         <Field>
//             <FormField
//                 control={form.control}
//                 name={name}
//                 render={({ field }) => (
//                     <FormItem className="w-[360px]">
//                         <FormLabel>{label}</FormLabel>
//                         <Select onValueChange={field.onChange} defaultValue={field.value}>
//                             <FormControl>
//                                 <SelectTrigger>
//                                     <SelectValue placeholder={placeholder} />
//                                 </SelectTrigger>
//                             </FormControl>
//                             <SelectContent>
//                                 <SelectGroup>
//                                     <SelectLabel>FE</SelectLabel>
//                                     {keyValuePairs?.map((pair) => (
//                                         <SelectItem key={pair.value} value={pair.value}>{pair.label}</SelectItem>
//                                     ))}
//                                 </SelectGroup>
//                             </SelectContent>
//                         </Select>
//                         <FormMessage />
//                     </FormItem>
//                 )}
//             />
//         </Field>
//     )
// }

export function MySelectFormField<T extends FieldValues>({ form, name, label, placeholder, groups }: MySelectFormFieldProps<T>) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    const flattenedPairs = useMemo(() => groups.flatMap(group => group.pairs), [groups]);

    return (
        <Field>
            <FormField
                control={form.control}
                name={name}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
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
                                                                field.onChange(currentValue === value ? "" : currentValue);
                                                                setOpen(false);
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
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </Field>
    );
}

export function MyRadioGroupFormField<T extends FieldValues>({ form, name, label, options }: MyRadioGroupFormFieldProps<T>) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className="space-y-3">
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-row"
                        >
                            {options.map((option) => (
                                <FormItem key={option.value} className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value={option.value} id={option.value} />
                                    </FormControl>
                                    <FormLabel className="font-normal" htmlFor={option.value}>
                                        {option.label}
                                    </FormLabel>
                                </FormItem>
                            ))}

                        </RadioGroup>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}       