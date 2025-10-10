import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

    export default function Loading() {
    return (
        <div className="w-full h-full p-6">
            {/* Back to List Skeleton */}
            <div className="h-4 w-24 bg-gray-300 rounded mb-6 ml-6"></div>

            {/* Card Skeleton */}
            <Card className="w-full border-0 shadow-none">
                <CardHeader>
                    {/* Title Skeleton */}
                    <CardTitle className="h-6 w-1/3 bg-gray-300 rounded mb-4"></CardTitle>

                    {/* Info Section Skeleton */}
                    <div className="w-full flex align-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="h-4 w-12 bg-gray-300 rounded"></div> {/* Blog Type Skeleton */}
                            <div className="h-4 w-12 bg-gray-300 rounded"></div> {/* Tag Skeleton */}
                            <div className="h-4 w-12 bg-gray-300 rounded"></div> {/* Tag Skeleton */}
                        </div>
                        <div className="flex align-center space-x-4">
                            <div className="h-4 w-16 bg-gray-300 rounded"></div> {/* Author Skeleton */}
                            <div className="h-4 w-24 bg-gray-300 rounded"></div> {/* Date Skeleton */}
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    {/* Content Skeleton */}
                    <div className="h-4 w-full bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 w-10/12 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 w-4/6 bg-gray-300 rounded mb-4"></div>
                    <div className="h-4 w-1/2 bg-gray-300 rounded mb-4"></div>
                    <div className="h-4 w-1/4 bg-gray-300 rounded mb-4"></div>
                    <div className="h-4 w-1/6 bg-gray-300 rounded mb-4"></div>

                    {/* Buttons Skeleton */}
                    <div className="flex items-center space-x-4 mt-6">
                        <Button disabled variant="outline" className="w-16 h-8 bg-gray-300"></Button> {/* Edit Button Skeleton */}
                        <Button disabled variant="destructive" className="w-16 h-8 bg-gray-300"></Button> {/* Delete Button Skeleton */}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}