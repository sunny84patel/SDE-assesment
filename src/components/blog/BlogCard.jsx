import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  const { id, title, excerpt, coverImage, author, publishedDate, readTime } =
    blog;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {coverImage && (
        <img
          src={coverImage}
          alt={title}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          <Link to={`/blogs/${id}`} className="hover:text-blue-600 transition">
            {blog.title}
          </Link>
        </h3>

        <p className="text-gray-600 mb-4">{excerpt}</p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <span>{blog.author}</span>
            <span className="mx-2">•</span>
            <span>{new Date(publishedDate).toLocaleDateString()}</span>
          </div>
          <span>{readTime} min read</span>
        </div>

        <Link
          to={`/blogs/${id}`}
          className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
