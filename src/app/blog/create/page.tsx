'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function BlogCreatePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    author: '',
    image: '',
    tags: '',
  });

  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false); // to ensure code runs only on the client

  useEffect(() => {
    // This effect will only run on the client
    setIsClient(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.author || !formData.image) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      setLoading(true);
      const tagsArray = formData.tags.split(',').map(tag => tag.trim());
      const response = await axios.post('/api/blogs/create', { ...formData, tags: tagsArray });

      toast.success('Blog created successfully!');
      setFormData({ title: '', description: '', author: '', image: '', tags: '' });

      // Redirect or handle navigation
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create blog.');
    } finally {
      setLoading(false);
    }
  };

  // Prevent rendering on the server and delay hydration issues
  if (!isClient) {
    return null; // Don't render anything on the server side
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-4 px-6">
      <h1 className="text-3xl font-bold mb-6">Create a New Blog</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl p-6 bg-white shadow-md rounded-lg"
      >
        <label className="block mb-2 font-semibold">Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter blog title"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          required
        />

        <label className="block mb-2 font-semibold">Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter blog description"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          rows={6}
          required
        />

        <label className="block mb-2 font-semibold">Author:</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Enter author name"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          required
        />

        <label className="block mb-2 font-semibold">Image URL:</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Enter image URL"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          required
        />

        <label className="block mb-2 font-semibold">Tags (comma-separated):</label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="Enter tags (e.g., tech, lifestyle)"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />

        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Create Blog'}
        </button>
      </form>
    </div>
  );
}
