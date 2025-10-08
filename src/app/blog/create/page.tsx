"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { MyInputFormField, MySelectFormField } from "@/components/ui/my_form_elements";
import { techGroups } from "@/const";
import { toFormData } from "@/lib/utils";
import { CreatePostRequest, CreatePostZodSchema } from "@/types/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { CreatePostAction, CreatePostActionServerSideState } from "./action";

const initialState: CreatePostActionServerSideState = {
    apiError: undefined
}

export default function CreateBlogPage() {
    const form = useForm<CreatePostRequest>({
        resolver: zodResolver(CreatePostZodSchema),
        defaultValues: {
            title: "Sample Blog Post",
            content: "This is a sample blog post content.",
            tags: [],
            summary: "",
            category: undefined,
            type: undefined,
        }
    })

    const [serverState, action, pending] = useActionState(CreatePostAction, initialState);


    const submit = useCallback(async (data: CreatePostRequest) => {
        startTransition(async () => {
            const formData = toFormData(data);
            await action(formData);
        });
    }, [action]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)}>
                <Card className="mt-4 mx-4">
                    <CardHeader>
                        <CardTitle>Create Blog Post</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <FieldGroup>
                            <MyInputFormField
                                form={form}
                                name={"title"}
                                label="Title"
                                placeholder="Enter blog title"
                            />
                            <MySelectFormField
                                form={form}
                                name={"category"}
                                label="Category"
                                placeholder="Select a category"
                                groups={techGroups}
                            />
                            <Field>
                                <Button type="submit">Create Post</Button>
                            </Field>
                        </FieldGroup>
                    </CardContent>
                </Card>
            </form>
        </Form>
    )
}