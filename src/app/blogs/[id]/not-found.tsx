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
            <Link href="/blogs" style={{ display: 'inline-block', marginTop: '20px', padding: '10px 20px', backgroundColor: '#0070f3', color: '#fff', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold' }}>
                Go back to Home Page
            </Link>
        </div>
    );
};

export default NotFound;