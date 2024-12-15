import { connect } from '@/dbConfig/dbConfig';
import Blog from '@/models/blogsModel';
import { NextRequest, NextResponse } from 'next/server';

// Define the blog data interface
interface BlogData {
  title: string;
  description: string;
  author: string;
  image?: string; // Optional if the blog might not always have an image
  tags?: string[]; // Optional if tags might not always be provided
}

export async function POST(req: NextRequest) {
  try {
    await connect();

    // Parse and validate the blog data
    const blogData: BlogData = await req.json();

    if (!blogData.title || !blogData.description || !blogData.author) {
      return NextResponse.json(
        { message: 'Missing required fields: title, description, and author' },
        { status: 400 }
      );
    }

    // Save the new blog to the database
    const newBlog = new Blog(blogData);
    await newBlog.save();

    return NextResponse.json(
      { message: 'Blog created successfully', blog: newBlog },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}


  

  