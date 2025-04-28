import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const HomePage = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Welcome to BlogApp
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Share your thoughts and explore stories from around the world.
      </p>
      <div className="space-x-4">
        <Link
          to="/blogs"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Explore Blogs
        </Link>
        {isAuthenticated ? (
          <>
            {isAdmin && (
              <Link
                to="/admin/dashboard"
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
              >
                Admin Dashboard
              </Link>
            )}
          </>
        ) : (
          <Link
            to="/signup"
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition"
          >
            Get Started
          </Link>
        )}
      </div>
    </div>
  );
};

export default HomePage;
