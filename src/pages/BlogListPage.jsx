import { useState, useEffect } from 'react';
import BlogList from '../components/blog/BlogList';
import { getAllPosts } from '../services/blogService';

const BlogListPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getAllPosts();
        setBlogs(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div className="py-12 text-center">Loading blogs…</div>;
  }

  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">All Blogs</h1>
      <BlogList blogs={blogs} loading={loading} error={error} />
    </div>
  );
};

export default BlogListPage;
