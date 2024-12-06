import { connect } from '@/dbConfig/dbConfig';
import Blog from '@/models/blogsModel';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connect();
    const blogs = await Blog.find().sort({ createdAt: -1 }); // Fetch and sort by date
    return NextResponse.json(blogs, { status: 200 });
  } catch (error:any) {
    return NextResponse.json({ error: 'Failed to fetch blogs', details: error.message }, { status: 500 });
  }
}
