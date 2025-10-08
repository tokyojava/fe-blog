import { FieldValues, Path, useForm } from "react-hook-form";
import { Field } from "./field";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Input } from "./input";

type MyFormFieldProps<T extends FieldValues> = {
    form: ReturnType<typeof useForm<T>>;
    name: Path<T>;
    label: string;
    placeholder?: string;
}

export default function MyInputFormField<T extends FieldValues>({ form, name, label, placeholder }: MyFormFieldProps<T>) {
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