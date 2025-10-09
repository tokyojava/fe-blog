import { FieldValues, Path, useForm } from "react-hook-form";
import { Field } from "./field";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Input } from "./input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Textarea } from "./textarea";
import { KeyValuePairGroup, SingleSelect } from "../business/single-select";

type MyBaseFormFieldProps<T extends FieldValues> = {
    form: ReturnType<typeof useForm<T>>;
    name: Path<T>;
    label?: string;
    noLabel?: boolean;
    className?: string;
}

type MyInputFormFieldProps<T extends FieldValues> = MyBaseFormFieldProps<T> & {
    placeholder?: string;
    isPassword?: boolean;
}

type MyTextAreaFormFieldProps<T extends FieldValues> = MyBaseFormFieldProps<T> & {
    placeholder?: string;
}


type MyRadioGroupFormFieldProps<T extends FieldValues> = MyBaseFormFieldProps<T> & {
    options: { label: string; value: string }[];
}

type MySelectFormFieldProps<T extends FieldValues> = MyBaseFormFieldProps<T> & {
    placeholder?: string;
    groups: KeyValuePairGroup[];
}

export function MyInputFormField<T extends FieldValues>({ isPassword, form, name, label, placeholder }: MyInputFormFieldProps<T>) {
    return (
        <Field>
            <FormField
                control={form.control}
                name={name}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            <Input type={isPassword ? "password" : "text"} placeholder={placeholder} {...field} />
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
    return (
        <Field>
            <FormField
                control={form.control}
                name={name}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            <SingleSelect
                                groups={groups}
                                placeholder={placeholder || "Select an option"}
                                onChange={(value) => {
                                    field.onChange(value);
                                }}
                            />
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