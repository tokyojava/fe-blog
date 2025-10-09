'use client';
import { Button } from '@/components/ui/button';
import React from 'react';

const ErrorPage = ({ error, reset }: { error: Error; reset: () => void }) => {
    console.error(error);

    return (
        <div className="p-8 text-center">
            <h1 className="text-xl text-red-600 mb-4">Oops! Something went wrong</h1>
            <p className="text-gray-500 mb-6">An unexpected error occurred. Please try again.</p>
            <Button
                onClick={reset}
                className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                Try Again
            </Button>
        </div>
    );
};

export default ErrorPage;
