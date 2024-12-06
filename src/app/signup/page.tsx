'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import userZodSchema from '@/libs/zod_schema/users';

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Setup form validation using react-hook-form and Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof userZodSchema>>({
    resolver: zodResolver(userZodSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  // Submit handler for signup
  const handleSignup = async (formData: z.infer<typeof userZodSchema>) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/users/signup', formData);
      toast.success('Signup successful!');
      console.log('Signup successful:', response.data);
      router.push('/login');
    } catch (error: any) {
      console.error('Signup error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-4 px-2">
      <h1 className="text-2xl font-bold mb-6">
        {loading ? 'Processing...' : 'Sign Up'}
      </h1>

      <form
        onSubmit={handleSubmit(handleSignup)}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md border"
      >
        {/* Username Field */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            {...register('username')}
            placeholder="Enter your username"
            className={`w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${errors.username ? 'border-red-500' : 'border-gray-300'
              }`}
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            placeholder="Enter your email"
            className={`w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register('password')}
            placeholder="Enter your password"
            className={`w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none disabled:bg-gray-300"
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>

      {/* Login Link */}
      <p className="mt-4 text-sm text-gray-600">
        Already have an account?{' '}
        <Link href="/login" className="text-blue-500 hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
}
