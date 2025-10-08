"use client";

import Markdown from "@/components/business/markdown";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { Form, FormLabel } from "@/components/ui/form";
import { MyInputFormField, MyRadioGroupFormField, MySelectFormField, MyTextAreaFormField } from "@/components/ui/my_form_elements";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { blogTypes, techGroups } from "@/const";
import { toFormData } from "@/lib/utils";
import { CreateBlogRequest, CreateBlogZodSchema } from "@/types/blog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Eye } from "lucide-react";
import { startTransition, useActionState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { CreateBlogAction, CreateBlogActionServerSideState } from "./action";

const initialState: CreateBlogActionServerSideState = {
    apiError: undefined
}

export default function CreateBlogPage() {
    const form = useForm<CreateBlogRequest>({
        resolver: zodResolver(CreateBlogZodSchema),
        defaultValues: {
            title: "This is a teitle",
            content: "aaaa nwnew. nmwewe",
            tags: [],
            summary: "",
            category: "javascript",
            type: "blog",
        }
    })

    const [serverState, action, pending] = useActionState(CreateBlogAction, initialState);


    const submit = useCallback(async (data: CreateBlogRequest) => {
        startTransition(async () => {
            const formData = toFormData(data);
            await action(formData);
        });
    }, [action]);

    const content = form.watch("content");

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)}>
                <Card className="mt-4 mx-4">
                    <CardHeader>
                        <CardTitle>Create Blog</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <FieldGroup>
                            <MyInputFormField
                                form={form}
                                name={"title"}
                                label="Title"
                                placeholder="Enter blog title"
                            />

                            <MyRadioGroupFormField
                                form={form}
                                name={"type"}
                                label="Type"
                                options={blogTypes}
                            />

                            <MySelectFormField
                                form={form}
                                name={"category"}
                                label="Category"
                                placeholder="Select a category"
                                groups={techGroups}
                            />


                            <FormLabel className="mb-[-16px]">Content</FormLabel>
                            <Tabs defaultValue="edit">
                                <TabsList>
                                    <TabsTrigger value="edit"><Edit /> Edit</TabsTrigger>
                                    <TabsTrigger value="preview"><Eye /> Preview</TabsTrigger>
                                </TabsList>
                                <TabsContent value="edit">
                                    <MyTextAreaFormField
                                        form={form}
                                        name={"content"}
                                        noLabel
                                        className="h-[500px]"
                                        placeholder="Enter blog content in markdown"
                                    />
                                </TabsContent>
                                <TabsContent value="preview" className="max-h-[500px]">
                                    <Markdown content={content} className="h-[500px]" />
                                </TabsContent>
                            </Tabs>

                            {serverState.apiError && <div className="text-red-500">{serverState.apiError}</div>}
                            <Field>
                                <Button
                                    disabled={pending}
                                    type="submit" className="w-[80px]">
                                    {pending ? "Creating..." : "Create Blog"}
                                </Button>
                            </Field>
                        </FieldGroup>
                    </CardContent>
                </Card>
            </form>
        </Form>
    )
}