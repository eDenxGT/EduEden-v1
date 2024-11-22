import React, { useState } from 'react';

const LectureDescriptionModal = ({ isOpen, onClose }) => {
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (description.trim()) {
      console.log('Submitting description:', description);
      // Add your submission logic here
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Add Lecture Description</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="p-4">
          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              rows="6"
              className="w-full border p-2 text-gray-900 focus:outline-none"
              placeholder="Write your lecture description here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-between p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-orange-500 text-white hover:bg-orange-600"
            disabled={!description.trim()}
          >
            Add Description
          </button>
        </div>
      </div>
    </div>
  );
};

export default LectureDescriptionModal;

