"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { LoginUserZodSchema } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { LoginAction } from "./actions";
import { toFormData } from "@/lib/utils";
import Link from "next/link";
import { MyInputFormField } from "@/components/ui/my_form_elements";
import { Form } from "@/components/ui/form";

const initialState = {
    apiError: undefined
};

export default function LoginPage() {
    const form = useForm({
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
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(submit)}>
                            <FieldGroup>
                                <MyInputFormField form={form} name="email" label="Email" placeholder="Your email" /> {/* 使用自定义组件 */}
                                <MyInputFormField form={form} name="password" label="Password" placeholder="Your password" /> {/* 使用自定义组件 */}
                                {serverState.apiError && <div className="text-red-500 text-center">{serverState.apiError}</div>}
                                <Field>
                                    <Button disabled={pending} type="submit">
                                        {pending ? "Logging in..." : "Log In"}
                                    </Button>
                                </Field>
                            </FieldGroup>
                            <div className="text-sm text-center text-gray-500 mt-2">
                                Don&apos;t have an account? <Link href="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}