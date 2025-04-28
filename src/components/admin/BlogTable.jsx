import { Link } from 'react-router-dom';
import { deletePost } from '../../services/blogService';

const BlogTable = ({ blogs, onDelete }) => {
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id);
        onDelete(id);
      } catch (err) {
        alert('Failed to delete post: ' + err.message);
      }
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Posts</h2>
      {blogs.length === 0 ? (
        <p className="text-gray-600">No posts available.</p>
      ) : (
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-gray-700">Title</th>
              <th className="px-4 py-2 text-left text-gray-700">Author</th>
              <th className="px-4 py-2 text-left text-gray-700">Date</th>
              <th className="px-4 py-2 text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id} className="border-b">
                <td className="px-4 py-2">{blog.title}</td>
                <td className="px-4 py-2">{blog.author.name}</td>
                <td className="px-4 py-2">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <Link
                    to={`/admin/blogs/edit/${blog._id}`}
                    className="text-blue-600 hover:underline mr-4"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BlogTable;
