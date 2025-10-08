'use client';
import React from 'react';

const ErrorPage = ({ error, reset }: { error: Error; reset: () => void }) => {
    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>Something went wrong</h1>
            <p>{error.message}</p>
            <button onClick={reset} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
                Try Again
            </button>
        </div>
    );
};

export default ErrorPage;