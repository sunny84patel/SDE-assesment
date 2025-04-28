import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import BlogDetail from '../components/blog/BlogDetail';
import { getPostById } from '../services/blogService';

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchBlog = async () => {
      try {
        const response = await getPostById(id);
        setBlog(response);
      } catch (err) {
        setError(err.message || 'Failed to fetch blog');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, isAuthenticated, navigate]);

  return (
    <div className="py-12">
      <BlogDetail blog={blog} loading={loading} error={error} />
    </div>
  );
};

export default BlogDetailPage;
