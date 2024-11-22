import React, { useState, useRef } from 'react';

const LectureNotesModal = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropZoneRef.current.classList.add('border-gray-400');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropZoneRef.current.classList.remove('border-gray-400');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropZoneRef.current.classList.remove('border-gray-400');
    
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleAddNotes = () => {
    if (selectedFile) {
      console.log('Adding description for file:', selectedFile);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Add Lecture Notes</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="p-4">
          <div
            ref={dropZoneRef}
            className="border-2 border-dashed border-gray-300 p-8 text-center"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Uploads Notes</h3>
              <p className="text-gray-500">
                Drag and drop a file or{' '}
                <button
                  onClick={handleBrowseClick}
                  className="text-blue-500 hover:text-blue-600"
                >
                  browse file
                </button>
              </p>
              {selectedFile && (
                <p className="text-sm text-gray-600">
                  Selected: {selectedFile.name}
                </p>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
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
            onClick={handleAddNotes}
            className="px-4 py-2 bg-orange-500 text-white hover:bg-orange-600"
            disabled={!selectedFile}
          >
            Add Notes
          </button>
        </div>
      </div>
    </div>
  );
};

export default LectureNotesModal;

