"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { MyInputFormField } from "@/components/ui/my_form_elements";
import { CreateEmailUserRequest, CreateEmailUserZodSchema } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { signUpAction } from "./actions";
import { toast } from "sonner";
import { ActionAPIResponse } from "@/lib/api";

export default function SignupPage() {
    const router = useRouter();
    const form = useForm<CreateEmailUserRequest>({
        resolver: zodResolver(CreateEmailUserZodSchema),
        defaultValues: {
            username: "aaa",
            email: "a@a.com",
            password: "11111111",
        }
    })

    const [apiError, setApiError] = useState("");

    // clear Api error if there are new user interactions
    const values = form.watch();
    useEffect(() => {
        setApiError("");
    }, [values.email, values.password, values.username]);

    const [isPending, startTransition] = useTransition();

    const submit = useCallback(async (data: CreateEmailUserRequest) => {
        startTransition(async () => {
            const result = (await signUpAction(data)) as ActionAPIResponse<null>;
            if (result.success) {
                toast.success("Sign up successful! Please log in.");
                router.push('/login');
            } else {
                setApiError(result.error.message);
            }
        });
    }, [router]);

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
                                <MyInputFormField isPassword form={form} name="password" label="Password" placeholder="Your password" /> {/* 使用自定义组件 */}
                                {apiError && <div className="text-red-500 text-center">{apiError}</div>}
                                <Field>
                                    <Button disabled={isPending} type="submit">
                                        {isPending ? "Signing up..." : "Sign Up"}
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
