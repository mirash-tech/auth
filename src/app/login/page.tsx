'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Define the login schema using Zod
const loginZodSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(5, 'Password must be at least 5 characters long'),
});

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Setup form validation with react-hook-form and Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginZodSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onLogin = async (data: z.infer<typeof loginZodSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', data);
      toast.success('Login successful');
      console.log('Login success', response.data);
      // Store token if required (localStorage or cookies)
      setLoading(false);
      router.push('/profile'); // Redirect to a dashboard or homepage
    } catch (error: any) {
      console.error('Login failed:', error);
      toast.error(error.response?.data?.message || 'Invalid email or password');
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">{loading ? 'Processing...' : 'Login Page'}</h1>
      <form
        onSubmit={handleSubmit(onLogin)}
        className="flex flex-col items-center w-full max-w-md p-4 border border-gray-300 rounded-md"
      >
        <label htmlFor="email" className="w-full text-left mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          {...register('email')}
          className="w-full p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:border-gray-600"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <label htmlFor="password" className="w-full text-left mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          {...register('password')}
          className="w-full p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:border-gray-600"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-lg mt-4 hover:bg-blue-600 disabled:bg-gray-300"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
      <div className="mt-4">
      <p className="mt-4 text-sm text-gray-600">
      Don't have an account?{' '}
        <Link href="/signup" className="text-blue-500 hover:underline">
          Sign Up
        </Link>
        </p>
      </div>
    </div>
  );
}
