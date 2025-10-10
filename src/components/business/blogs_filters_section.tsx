"use client"

import { Filter } from "lucide-react"
import { CommandBasedSelect } from "./command-based-select"
import { techGroups } from "@/const"
import { useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Button } from "../ui/button"

const types = [{
    title: "",
    pairs: [
        { label: "All", value: "all" },
        { label: "Blog", value: "blog" },
        { label: "Diary", value: "diary" },
    ]
}];

export function BlogsFiltersSection() {
    const initialSearchParams = useSearchParams();
    const [type, setType] = useState<string>(initialSearchParams.get("type") || "all");
    const [category, setCategory] = useState<string[]>(initialSearchParams.getAll("category") || []);

    const router = useRouter();
    const params = useSearchParams();
    const pathname = usePathname();

    const doSearch = () => {
        const params = new URLSearchParams();
        if (type && type !== "all") {
            params.append("type", type);
        }
        category.forEach(cat => {
            params.append("category", cat);
        });
        router.replace(`${pathname}?${params.toString()}`);
    }

    const doRefresh = () => {
        const newParams = new URLSearchParams(params.toString());
        newParams.set("refresh", Date.now().toString());
        router.replace(`${pathname}?${newParams.toString()}`);
    }

    return (
        <div className="border rounded p-2 mb-4 bg-white shadow-sm">
            <div className="flex items-center mb-2">
                <span className="flex items-center text-gray-600 text-sm font-medium">
                    <Filter className="h-4 w-4 mr-1" />
                    Filters
                </span>
            </div>
            <div className="flex items-center space-x-2 flex-wrap">
                <div className="flex flex-col">
                    <span className="text-xs font-medium text-gray-500 mb-1">Type</span>
                    <CommandBasedSelect
                        groups={types}
                        defaultValue={type}
                        onChange={(val) => {
                            setType(val as string);
                        }}
                        placeholder="All"
                    />
                </div>
                <div className="flex flex-col">
                    <span className="text-xs font-medium text-gray-500 mb-1">Category</span>
                    <CommandBasedSelect
                        onChange={(value) => {
                            setCategory(value as string[]);
                        }}
                        defaultValue={category}
                        groups={techGroups}
                        placeholder="All"
                        maxSelections={3}
                        multiple
                    />
                </div>
                <Button onClick={doSearch} className="mt-4 w-auto px-4 py-1 text-sm">Search</Button>
                <Button onClick={doRefresh} variant="outline" className="mt-4 w-auto px-4 py-1 text-sm">Refresh</Button>
            </div>
        </div>
    )
}
