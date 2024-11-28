import React, { useState } from 'react';
import { useBlog } from '../../context/ContextProvider';
import dateFormatter from '../../utils/dateFormatter';
import { FaEdit } from 'react-icons/fa';
import usePrivateAxios from '../../context/usePrivateAxios';
import ConfirmModal from '../../utils/ConfirmModal';
import { useNavigate } from 'react-router-dom';

const ManagePosts = () => {
  const privateAxios = usePrivateAxios();
  const { blog, isloading, error,fetchBlog } = useBlog();
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // success, error, warning
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
const navigate = useNavigate()
  const onCancel = async() => {
    setIsOpen(false);
    setSelectedPostId(null);
  };

  const handleDelete = async (id) => {
    try {
      const response = await privateAxios.delete(`/blog/delete/${id}`);
      if (response.status === 200) {
        await fetchBlog()
        setMessage('Blog post deleted successfully!');
        setMessageType('success');
        setIsOpen(true);
      } else {
        setMessage(response.data.message);
        setMessageType('error');
        setIsOpen(true);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      setMessage('Failed to delete the post.');
      setMessageType('error');
      setIsOpen(true);
    }
  };

  return (
    <>
      {isloading && !error && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={isOpen}
        message={message}
        messageType={messageType}
        onConfirm={handleDelete}
        onCancel={onCancel}
        setIsOpen={setIsOpen}
        id={selectedPostId}
      />

      {/* Manage Posts Table */}
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                <thead>
                  <tr>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">No</th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Blog Name</th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Published Date</th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Manage</th>
                    <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {blog?.map((b, index) => (
                    <tr key={index} className="odd:bg-white even:bg-gray-100 dark:odd:bg-neutral-900 dark:even:bg-neutral-800">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{b?.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{dateFormatter(b?.createdAt)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                        <FaEdit onClick={()=>navigate(`/update/${b?._id}`)} className="inline-flex cursor-pointer items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-end font-medium">
                        <button
                          onClick={() => {
                            setSelectedPostId(b?._id);
                            setMessageType('warning');
                            setMessage('Are you sure you want to delete this blog?');
                            setIsOpen(true);
                          }}
                          type="button"
                          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-600 hover:text-red-800 focus:outline-none"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagePosts;
