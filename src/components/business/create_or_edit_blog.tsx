"use client";
import { CreateOrUpdateBlogAction } from "@/app/blogs/create/action";
import { blogTypes, techGroups } from "@/const";
import { ActionAPIResponse } from "@/lib/api";
import { CreateOrUpdateBlogRequest, CreateOrUpdateBlogZodSchema } from "@/types/blog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Eye } from "lucide-react";
import { redirect } from "next/navigation";
import { useTransition, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { FieldGroup, Field } from "../ui/field";
import { Form, FormLabel } from "../ui/form";
import { MyInputFormField, MyRadioGroupFormField, MySelectFormField, MyTextAreaFormField } from "../ui/my_form_elements";
import { BackToList } from "./back_to_list";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Markdown from "./markdown";

export interface CreateOrEditBlogProps {
    existingValues?: CreateOrUpdateBlogRequest;
    id?: string; // for edit blog
}

export function CreateOrEditBlog(props: CreateOrEditBlogProps) {
    const defaultValues = props.existingValues;
    const isEditMode = !!props.id;
    const form = useForm<CreateOrUpdateBlogRequest>({
        resolver: zodResolver(CreateOrUpdateBlogZodSchema),
        defaultValues: {
            title: defaultValues ? defaultValues.title : "",
            content: defaultValues ? defaultValues.content : "",
            tags: defaultValues ? defaultValues.tags : [],
            summary: defaultValues ? defaultValues.summary : "",
            category: defaultValues ? defaultValues.category : undefined,
            type: defaultValues ? defaultValues.type : undefined,
        }
    })

    const [pending, startTransition] = useTransition();
    const [apiError, setApiError] = useState("")

    const submit = useCallback((data: CreateOrUpdateBlogRequest) => {
        startTransition(async () => {
            const result = (await CreateOrUpdateBlogAction(data, props.id)) as ActionAPIResponse<string>;
            if (!result.success) {
                setApiError(result.error.message);
            } else {
                redirect('/blogs/' + result.data); // Redirect to the newly created blog page
            }
        });
    }, [props.id]);

    const content = form.watch("content");

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)}>
                <BackToList />

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
                                defaultValue={defaultValues?.category}
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

                            {apiError && <div className="text-red-500">{apiError}</div>}
                            <Field>
                                <Button
                                    disabled={pending}
                                    type="submit" className="w-[80px]">
                                    {
                                        isEditMode ? (pending ? "Updating..." : "Update") : (pending ? "Creating..." : "Create")
                                    }
                                </Button>
                            </Field>
                        </FieldGroup>
                    </CardContent>
                </Card>
            </form>
        </Form>
    )
}