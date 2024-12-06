import { z } from 'zod';

const userZodSchema = z.object({
  username: z
    .string()
    .min(5, 'Username must be at least 5 characters long')
    .max(20, 'Username must be at most 20 characters long'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(5, 'Password must be at least 5 characters long')
    .max(1000, 'Password must be at most 1000 characters long'),
    isVerified: z.boolean().optional(),
    isAdmin: z.boolean().optional(),
  forgotPasswordToken: z.string().optional(),
  forgotPasswordExpires: z.date().optional(),
  verifyToken: z.string().optional(),
  verifyTokenExpiry: z.date().optional(),
});

export default userZodSchema;
