import React from 'react';
import ReactDOM from 'react-dom';
import FormInput from '../components/FormInput';

const ConfirmModal = ({
  isOpen,
  message,
  messageType,
  onConfirm,
  onCancel,
  setIsOpen,
  id,
  handleUpdate,
  user,
  setUserName,
  setEmail
}) => {
  if (!isOpen) return null;  // Don't render if the modal is closed

  // Define the styles and button texts based on messageType
  let modalStyles, confirmBtnClass, cancelBtnClass, confirmBtnText;

  switch (messageType) {
    case 'success':
      modalStyles = 'bg-green-100 text-green-800';
      confirmBtnClass = 'bg-green-600 hover:bg-green-700';
      cancelBtnClass = 'bg-gray-300 text-black hover:bg-gray-400';
      confirmBtnText = 'Close';
      break;
    case 'update':
      modalStyles = 'bg-yellow-100 text-yellow-800';
      confirmBtnClass = 'bg-yellow-600 hover:bg-yellow-700';
      cancelBtnClass = 'bg-gray-300 text-black hover:bg-gray-400';
      confirmBtnText = 'Update';
      break;

    case 'error':
      modalStyles = 'bg-red-100 text-red-800';
      confirmBtnClass = 'bg-red-600 hover:bg-red-700';
      cancelBtnClass = 'bg-gray-300 text-black hover:bg-gray-400';
      confirmBtnText = 'Close';
      break;

    case 'warning':
      modalStyles = 'bg-yellow-100 text-yellow-800';
      confirmBtnClass = 'bg-yellow-600 hover:bg-yellow-700';
      cancelBtnClass = 'bg-gray-300 text-black hover:bg-gray-400';
      confirmBtnText = 'Confirm';
      break;

    default:
      modalStyles = 'bg-white text-gray-800';
      confirmBtnClass = 'bg-green-600 hover:bg-green-700';
      cancelBtnClass = 'bg-gray-300 text-black hover:bg-gray-400';
      confirmBtnText = 'Confirm';
      break;
  }

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className={`p-6 rounded-lg shadow-lg max-w-md w-full ${modalStyles}`}>
        <p className="text-lg font-semibold mb-4">{message}</p>
        {messageType === 'update' && (
          <div className='flex flex-col'>
            <form >
              <input
                name="userName"
                type="text"
                placeholder="UserName"
                defaultValue={user?.userName}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={(e) => setUserName(e.target.value)}

              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                defaultValue={user?.email}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </form>

            <div className='flex justify-between mt-5'>
              <button
                onClick={() => {
                  onCancel();
                  setIsOpen(false);
                }}
                className={`px-4 py-2 rounded-lg transition-colors ${cancelBtnClass}`}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleUpdate(user);  // Pass the ID for confirmation
                  setIsOpen(false); // Close the modal
                }}
                className={`px-4 py-2 rounded-lg transition-colors ${confirmBtnClass}`}
              >
                {confirmBtnText}
              </button>
            </div>
          </div>
        )}
        <div className="flex justify-end space-x-4">
          {messageType === 'warning' && (
            <button
              onClick={() => {
                onCancel();
                setIsOpen(false);
              }}
              className={`px-4 py-2 rounded-lg transition-colors ${cancelBtnClass}`}
            >
              Cancel
            </button>
          )}
          {
            messageType !== 'update' &&
            <button
              onClick={() => {
                if (messageType === 'warning') {
                  onConfirm(id);  // Pass the ID for confirmation
                }
                setIsOpen(false); // Close the modal
              }}
              className={`px-4 py-2 rounded-lg transition-colors ${confirmBtnClass}`}
            >
              {confirmBtnText}
            </button>
          }
        </div>
      </div>
    </div>,
    document.getElementById('waring-modal')
  );
};

export default ConfirmModal;
