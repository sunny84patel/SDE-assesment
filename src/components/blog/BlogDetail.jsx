import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

const BlogDetail = ({ blog, loading, error }) => {
  const { isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="spinner"></div>
        <p className="ml-2">Loading blog...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-lg">
        Error: {error}
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl text-gray-600">Blog not found.</h3>
        <Link to="/blogs" className="mt-4 text-blue-600 hover:underline">
          Back to blogs
        </Link>
      </div>
    );
  }

  const { title, content, author, publishedDate, coverImage, readTime, tags } =
    blog;

  return (
    <article className="max-w-3xl mx-auto">
      {isAdmin && (
        <div className="mb-6 flex justify-end">
          <Link
            to={`/admin/blogs/edit/${blog.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Edit Blog
          </Link>
        </div>
      )}

      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        {title}
      </h1>

      <div className="flex items-center text-gray-600 mb-6">
        <span className="font-medium">{author}</span>
        <span className="mx-2">•</span>
        <span>{new Date(publishedDate).toLocaleDateString()}</span>
        <span className="mx-2">•</span>
        <span>{readTime} min read</span>
      </div>

      {coverImage && (
        <img
          src={coverImage}
          alt={title}
          className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
        />
      )}

      <div className="prose max-w-none">{content}</div>

      {tags && tags.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-bold text-gray-700 mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};

export default BlogDetail;
