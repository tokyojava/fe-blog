"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { CreateEmailUserRequest, CreateEmailUserZodSchema } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

export default function SignupPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<CreateEmailUserRequest>({
        resolver: zodResolver(CreateEmailUserZodSchema),
    })

    const submit = useCallback((data: CreateEmailUserRequest) => {
        console.log("Form Data: ", data);
    }, []);

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
                    <form onSubmit={handleSubmit(submit)}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="username">Full Name</FieldLabel>
                                <Input {...register("username")} id="username" type="input" placeholder="Jane Doe" />
                                {errors.username && <FieldDescription className="text-red-500">{errors.username.message}</FieldDescription>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input {...register("email")} id="email" type="input" placeholder="m@example.com" />
                                {errors.email && <FieldDescription className="text-red-500">{errors.email.message}</FieldDescription>}
                            </Field>
                            <Field className="grid grid-cols-2 gap-4">
                                <Field>
                                    <FieldLabel htmlFor="pw1">Password</FieldLabel>
                                    <Input {...register("password")} id="pw1" type="password" />
                                    {errors.password && <FieldDescription className="text-red-500">{errors.password.message}</FieldDescription>}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="pw2">Confirm Password</FieldLabel>
                                    <Input id="pw2" type="password" />
                                </Field>
                                <FieldDescription>
                                    Must be at least 8 characters long.
                                </FieldDescription>
                            </Field>
                            <Field>
                                <Button>Create Account</Button>
                                <FieldDescription className="text-center">
                                    Already have an account? <a href="#">Sign in</a>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>

                    </form>
                </CardContent>
            </Card >
        </div >
    )
}
