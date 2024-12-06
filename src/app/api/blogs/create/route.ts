import { NextRequest, NextResponse } from 'next/server';
import Blog from '@/models/blogsModel';
import { connect } from '@/dbConfig/dbConfig';
import { blogCreateSchema } from '@/libs/zod_schema/blogs'
import {z} from 'zod';

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    // Connect to the database
    await connect();

    // Parse incoming JSON body
    const body = await request.json();

    // Validate data using Zod schema
    const parsedData = blogCreateSchema.parse(body); // This will throw if validation fails

    // Create the blog in the database
    const newBlog = new Blog(parsedData);

    // Save to the database
    const savedBlog = await newBlog.save();

    // Respond with success message
    return NextResponse.json(
      { message: 'Blog created successfully', success: true, blog: savedBlog },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating blog:', error);

    // If validation fails, handle the error here
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Validation failed', success: false, errors: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Error creating blog', success: false, error: error.message },
      { status: 500 }
    );
  }
}
