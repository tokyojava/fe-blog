'use client';
import React from 'react';

interface ErrorPageProps {
    error: Error;
    reset: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ error, reset }) => {
    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>Something went wrong</h1>
            <p className={"text-red-500"}>{error.message}</p>
            <button
                onClick={reset}
                style={{
                    marginTop: '1rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#0070f3',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
            >
                Try Again
            </button>
        </div>
    );
};

export default ErrorPage;