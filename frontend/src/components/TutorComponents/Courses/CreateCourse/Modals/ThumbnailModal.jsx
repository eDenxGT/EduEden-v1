import React, { useState, useRef, useCallback } from "react";
import { toast } from "sonner";

const ThumbnailUploadModal = ({ isOpen, onClose, onUpload }) => {
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setThumbnailFile(file);
    } else {
      toast.error("Please drop an image file");
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl">Add Thumbnail</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div 
          className="p-8"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <h3 className="text-lg mb-4">Upload Thumbnail</h3>
            <div className="border-2 border-dashed border-gray-300 p-8 rounded-sm">
              <p className="text-gray-600">
                Drag and drop a file or{' '}
                <button
                  onClick={handleBrowseClick}
                  className="text-blue-500 hover:text-blue-600"
                >
                  browse file
                </button>
              </p>
              {thumbnailFile && (
                <p className="mt-2 text-sm text-gray-500">
                  Selected: {thumbnailFile.name}
                </p>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between p-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-50 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (thumbnailFile) {
                onUpload(thumbnailFile);
                onClose();
              } else {
                toast.error("Please select a file first");
              }
            }}
            className="px-4 py-2 bg-orange-200 text-orange-700 hover:bg-orange-300"
          >
            Add Description
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThumbnailUploadModal;

