import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import BlogForm from '../components/admin/BlogForm';
import BlogTable from '../components/admin/BlogTable';
import { getAllPosts, getPostById } from '../services/blogService';

const AdminDashboardPage = () => {
  const { action, id } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAdmin, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate('/login');
      return;
    }

    const fetchBlogs = async () => {
      try {
        const response = await getAllPosts();
        setBlogs(response);
      } catch (err) {
        setError(err.message || 'Failed to fetch blogs');
      } finally {
        setLoading(false);
      }
    };

    const fetchPost = async () => {
      if (id && action === 'edit') {
        try {
          const response = await getPostById(id);
          setSelectedPost(response);
        } catch (err) {
          setError(err.message || 'Failed to fetch post');
        }
      }
    };

    fetchBlogs();
    fetchPost();
  }, [isAuthenticated, isAdmin, navigate, action, id]);

  const handleDelete = (id) => {
    setBlogs(blogs.filter((blog) => blog._id !== id));
  };

  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}
      {action === 'create' || action === 'edit' ? (
        <BlogForm existingPost={selectedPost} />
      ) : (
        <>
          <div className="mb-6">
            <Link
              to="/admin/blogs/create"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Create New Post
            </Link>
          </div>
          <BlogTable blogs={blogs} onDelete={handleDelete} loading={loading} />
        </>
      )}
    </div>
  );
};

export default AdminDashboardPage;
