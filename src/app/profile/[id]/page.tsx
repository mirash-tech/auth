'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

export default function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();

  // Unwrap the params promise
  const { id } = React.use(params);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-4 px-2">
      <h1 className="text-2xl font-bold">Profile Page</h1>
      <h2 className="p-3 bg-green-400 rounded text-white">User ID: {id}</h2>
      <button
        onClick={() => router.push('/blog/create')}
        className="mt-6 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Create a New Blog
      </button>
      <button
        onClick={() => router.push('/blog/index')}
        className="mt-6 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        View Blogs
      </button>
      <button
        onClick={() => router.push('/users/login')}
        className="mt-6 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Logout
      </button>
    </div>
  );
}
