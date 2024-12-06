import axios from 'axios';

interface Blog {
  _id: string;
  title: string;
  description: string;
  image: string;
  author: string;
  createdAt: string;
}

async function fetchBlogs(): Promise<Blog[]> {
  try {
    const response = await axios.get(`${process.env.DOMAIN}/api/blogs/index`);
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

export default async function BlogListPage() {
  const blogs = await fetchBlogs();

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">All Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-white shadow rounded-md p-4">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover rounded-md"
            />
            <h2 className="text-xl font-semibold mt-4">{blog.title}</h2>
            <p className="text-gray-600 mt-2 line-clamp-3">{blog.description}</p>
            <p className="text-sm text-gray-500 mt-2">By {blog.author}</p>
            <a
              href={`/blog/${blog._id}`}
              className="inline-block mt-4 text-blue-500 hover:underline"
            >
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
