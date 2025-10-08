"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { MyInputFormField } from "@/components/ui/my_form_elements";
import { toFormData } from "@/lib/utils";
import { CreateEmailUserRequest, CreateEmailUserZodSchema } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { startTransition, useActionState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { SignUpAction } from "./actions";
const initialState = {
    apiError: undefined
}

export default function SignupPage() {
    const form = useForm<CreateEmailUserRequest>({
        resolver: zodResolver(CreateEmailUserZodSchema),
        defaultValues: {
            username: "aaa",
            email: "a@a.com",
            password: "11111111",
        }
    })

    const [serverState, action, pending] = useActionState(SignUpAction, initialState);

    const values = form.watch(); // 使表单状态可响应式更新
    useEffect(() => {
        serverState.apiError = undefined;
    }, [serverState, values]);

    const submit = useCallback(async (data: CreateEmailUserRequest) => {
        startTransition(async () => {
            const formData = toFormData(data as Record<string, string>);
            await action(formData);
        });
    }, [action]);

    return (
        <div className={"w-full h-full relative"}>
            <Card className="w-1/2 absolute top-1/6 left-1/2 -translate-x-1/2">
                <CardHeader>
                    <CardTitle>
                        Create your account
                    </CardTitle>

                    <CardDescription>
                        Enter your email below to create your account
                    </CardDescription>

                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(submit)}>
                            <FieldGroup>
                                <MyInputFormField form={form} name="username" label="Your username" placeholder="Your username" /> {/* 使用自定义组件 */}
                                <MyInputFormField form={form} name="email" label="Email" placeholder="Your email" /> {/* 使用自定义组件 */}
                                <MyInputFormField form={form} name="password" label="Password" placeholder="Your password" /> {/* 使用自定义组件 */}
                                {serverState.apiError && <div className="text-red-500 text-center">{serverState.apiError}</div>}
                                <Field>
                                    <Button disabled={pending} type="submit">
                                        {pending ? "Signing up..." : "Sign Up"}
                                    </Button>
                                </Field>
                            </FieldGroup>
                            <div className="text-sm text-center text-gray-500 mt-2">
                                Already have an account? <Link href="/login" className="text-blue-500 hover:underline">Log In</Link>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card >
        </div >
    )
}
