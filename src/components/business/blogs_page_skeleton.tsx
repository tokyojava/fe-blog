import { Card, CardHeader, CardContent } from "../ui/card";
import { Button } from "../ui/button";

export default function BlogsPageSkeleton() {
    return (
        <div className="space-y-4">
            {/* Skeleton for Blog Card */}
            {Array.from({ length: 3 }).map((_, index) => (
                <Card key={index}>
                    <CardHeader className="flex items-center justify-between">
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-300 rounded w-16"></div> {/* Title Skeleton */}
                            <div className="flex items-center space-x-2">
                                <div className="h-3 bg-gray-300 rounded w-8"></div> {/* Author Skeleton */}
                                <div className="h-3 bg-gray-300 rounded w-8"></div> {/* Date Skeleton */}
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="h-6 bg-gray-300 rounded w-12"></div> {/* Blog Type Skeleton */}
                            <div className="h-6 bg-gray-300 rounded w-12"></div> {/* Category Skeleton */}
                        </div>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <div className="flex space-x-2">
                            <Button disabled variant="outline" className="w-16 h-8 bg-gray-300"></Button> {/* View Button Skeleton */}
                            <Button disabled variant="outline" className="w-16 h-8 bg-gray-300"></Button> {/* Edit Button Skeleton */}
                        </div>
                        <Button disabled variant="destructive" className="w-16 h-8 bg-gray-300"></Button> {/* Delete Button Skeleton */}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}