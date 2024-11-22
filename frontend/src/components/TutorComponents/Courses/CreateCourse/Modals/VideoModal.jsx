  import React, { useState, useRef, useCallback } from "react";
  import { toast } from "sonner";
  import { Upload } from 'lucide-react';
  
  const LectureVideoModal = ({ isOpen, onClose }) => {
    const [linkUrl, setLinkUrl] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [previewData, setPreviewData] = useState(null);
    const [videoDuration, setVideoDuration] = useState(null);
    const fileInputRef = useRef(null);
    const dragCounterRef = useRef(0);
  
    if (!isOpen) return null;
  
    const formatDuration = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };
  
    const getYouTubeVideoId = (url) => {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? match[2] : null;
    };
  
    const handleLinkChange = async (e) => {
      const url = e.target.value;
      setLinkUrl(url);
      
      // Reset preview if input is cleared
      if (!url) {
        setPreviewData(null);
        return;
      }
  
      const videoId = getYouTubeVideoId(url);
      console.log(videoId);
      
      if (videoId) {
        // Set YouTube thumbnail
        setPreviewData({
          type: 'youtube',
          thumbnail: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
          title: 'YouTube Video'
        });
      }
    };
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setSelectedFile(file);
        // Create local video preview
        const objectUrl = URL.createObjectURL(file);
        const video = document.createElement('video');
        video.src = objectUrl;
        video.onloadedmetadata = () => {
          setVideoDuration(video.duration);
          setPreviewData({
            type: 'local',
            thumbnail: objectUrl,
            title: file.name,
            duration: formatDuration(video.duration)
          });
        };
      }
    };
  
    const handleValidate = () => {
      if (!linkUrl) {
        toast.error("Please enter a video URL");
        return;
      }
      const videoId = getYouTubeVideoId(linkUrl);
      if (!videoId) {
        toast.error("Invalid YouTube URL");
        return;
      }
      toast.success("Valid YouTube URL");
    };
  

    const handleUpload = () => {
      if (!selectedFile && !linkUrl) {
        toast.warning("No file or link selected.");
        return;
      }
      if (selectedFile) {
        console.log("Uploading file:", selectedFile);
      } else if (linkUrl) {
        console.log("Uploading link:", linkUrl);
      }
    };
  
    const handleFileButtonClick = () => {
      fileInputRef.current.click();
    };
  
    const handleDragEnter = useCallback((e) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounterRef.current++;
      if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
        setIsDragging(true);
      }
    }, []);
  
    const handleDragLeave = useCallback((e) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounterRef.current--;
      if (dragCounterRef.current === 0) {
        setIsDragging(false);
      }
    }, []);
  
    const handleDragOver = useCallback((e) => {
      e.preventDefault();
      e.stopPropagation();
    }, []);
  
    const handleDrop = useCallback((e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      dragCounterRef.current = 0;
      const file = e.dataTransfer.files[0];
      if (file) {
        setSelectedFile(file);
      }
    }, []);  
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {isDragging && (
          <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
            <div className="text-white flex flex-col items-center">
              <Upload size={48} className="mb-4" />
              <p className="text-xl font-semibold">Drop your file here</p>
            </div>
          </div>
        )}
        <div className="bg-white w-full max-w-md">
          {!previewData ? (
            // Original upload interface
            <>
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-semibold">Lecture Video</h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <label
                    htmlFor="videoLink"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Upload Links
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="videoLink"
                      className="flex-grow px-3 py-2 border border-r-0"
                      placeholder="Enter video URL"
                      value={linkUrl}
                      onChange={handleLinkChange}
                    />
                    <button
                      onClick={handleValidate}
                      className="px-4 py-2 bg-gray-200 border border-l-0 hover:bg-gray-300"
                    >
                      Validate
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Note: All links should be valid.
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="px-4 text-gray-500 text-sm">OR</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <div>
                  <label
                    htmlFor="videoFile"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Upload Files
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      className="flex-grow px-3 py-2 border border-r-0 bg-gray-100 focus:outline-none"
                      placeholder="No file chosen"
                      value={selectedFile ? selectedFile.name : ""}
                      readOnly
                    />
                    <button
                      onClick={handleFileButtonClick}
                      className="px-4 py-2 bg-gray-200 border border-l-0 hover:bg-gray-300"
                    >
                      Choose File
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      id="videoFile"
                      accept="video/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Note: All files should be at least 720p and less than 4.0 GB.
                  </p>
                </div>
              </div>
            </>
          ) : (
            // Preview interface
            <>
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-semibold">Lecture Video</h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="p-4">
                <div className="flex space-x-4">
                  <div className="w-40 h-24 bg-gray-100 relative">
                    <img
                      src={previewData.thumbnail}
                      alt="Video thumbnail"
                      className="w-full h-full object-cover"
                    />
                    {previewData.duration && (
                      <span className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1 rounded">
                        {previewData.duration}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-green-600 font-medium mb-1">
                      FILE UPLOADED
                      {previewData.duration && ` • ${previewData.duration}`}
                    </div>
                    <div className="text-sm mb-2">{previewData.title}</div>
                    <button
                      onClick={() => {
                        setPreviewData(null);
                        setSelectedFile(null);
                        setLinkUrl("");
                      }}
                      className="text-blue-500 text-sm hover:text-blue-600"
                    >
                      Replace Video
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="flex justify-between p-4 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 border hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              className="px-4 py-2 bg-orange-500 text-white hover:bg-orange-600"
            >
              Upload Video
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default LectureVideoModal;
  
  