"use client"
import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const NotFound = () => {
    const { id } = useParams();

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>404 - Blog Not Found</h1>
            <p>The blog post with ID {id} does not exist.</p>
            <Link href="/blogs" style={{ color: 'blue', textDecoration: 'underline' }}>
                Go back to Home Page
            </Link>
        </div>
    );
};

export default NotFound;