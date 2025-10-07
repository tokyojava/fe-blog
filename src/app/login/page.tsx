"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LoginUserZodSchema } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { LoginAction } from "./actions";
import { toFormData } from "@/lib/utils";
import Link from "next/link";

const initialState = {
    serverValidationErrors: {},
    apiError: undefined
};

export default function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(LoginUserZodSchema),
        defaultValues: {
            email: "a@a.com",
            password: "11111111",
        }
    });

    const [serverState, action, pending] = useActionState(LoginAction, initialState);

    const submit = useCallback(async (data: Record<string, string>) => {
        startTransition(async () => {
            const formData = toFormData(data);
            await action(formData);
        });
    }, [action]);

    return (
        <div className={"w-full h-full relative"}>
            <Card className="w-1/2 absolute top-1/6 left-1/2 -translate-x-1/2">
                <CardHeader>
                    <CardTitle>
                        Welcome Back
                    </CardTitle>

                    <CardDescription>
                        Enter your email and password to log in
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(submit)}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input {...register("email")} id="email" type="input" placeholder="m@example.com" />
                                {errors.email && <FieldDescription className="text-red-500">{errors.email.message}</FieldDescription>}
                                {serverState.serverValidationErrors.email && serverState.serverValidationErrors.email.map((err, idx) => (
                                    <FieldDescription key={idx} className="text-red-500">{err}</FieldDescription>
                                ))}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                <Input {...register("password")} id="password" type="password" />
                                {errors.password && <FieldDescription className="text-red-500">{errors.password.message}</FieldDescription>}
                                {serverState.serverValidationErrors.password && serverState.serverValidationErrors.password.map((err, idx) => (
                                    <FieldDescription key={idx} className="text-red-500">{err}</FieldDescription>
                                ))}
                            </Field>
                            {serverState.apiError && <div className="text-red-500 text-center">{serverState.apiError}</div>}
                            <Field>
                                <Button disabled={pending} type="submit">
                                    Log In
                                </Button>
                                <FieldDescription className="text-center">
                                    Don&apos;t have an account? <Link href="/signup">Sign up</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}