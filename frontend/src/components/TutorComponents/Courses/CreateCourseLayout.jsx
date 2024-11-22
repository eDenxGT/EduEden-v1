import { useState } from "react";
import Card from "../../CommonComponents/Card";
import AdvanceInformationPage from "./CreateCourse/AdvancedInformationPage";
import LectureAddingPage from "./CreateCourse/LectureAddingPage";
import PublishCoursePage from "./CreateCourse/PublishCoursePage";
import BasicInformationPage from "./CreateCourse/BasicInformationPage";
import { Layers, NotepadText, TvMinimalPlay, Upload } from "lucide-react";
import { useSelector } from "react-redux";

const CreateCourseLayout = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    duration: "",
    language: "",
    level: "",
  });
  const [page, setPage] = useState(1);

  const isDarkMode = useSelector(state=>state.tutor.toggleTheme)
  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const navItems = [
    { label: "Basic Information", icon: <Layers size={16} /> },
    { label: "Advance Information", icon: <NotepadText size={18}/> },
    { label: "Add Lectures", icon: <TvMinimalPlay size={18} /> },
    { label: "Publish Course", icon: <Upload size={16} /> },
  ];

  return (
    <div
      className={`min-h-screen p-6 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-200 text-gray-900"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <Card
          className={`p-6 overflow-visible ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          {/* Header Section */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Create a new course</h2>
          </div>

          {/* Navigation Section */}
          <nav className="flex justify-evenly mb-4 border-b border-gray-600 pb-4">
            {navItems.map((item, index) => (
              <a
                key={item.label}
                href="#"
                className={`flex items-center space-x-2 ${
                  page === index + 1
                    ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                    : isDarkMode
                    ? "text-gray-400 hover:text-gray-300"
                    : "text-gray-500 hover:text-gray-700"
                } transition-colors duration-200`}
                onClick={() => setPage(index + 1)}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Page Rendering */}
          {page === 1 && (
            <BasicInformationPage
              formData={formData}
              updateFormData={updateFormData}
              goToNextPage={() => setPage(2)}
              isDarkMode={isDarkMode}
            />
          )}
          {page === 2 && (
            <AdvanceInformationPage
              formData={formData}
              updateFormData={updateFormData}
              goToNextPage={() => setPage(3)}
              isDarkMode={isDarkMode}
            />
          )}
          {page === 3 && (
            <LectureAddingPage
              formData={formData}
              updateFormData={updateFormData}
              goToNextPage={() => setPage(4)}
              isDarkMode={isDarkMode}
            />
          )}
          {page === 4 && (
            <PublishCoursePage
              formData={formData}
              updateFormData={updateFormData}
              goToNextPage={() => console.log("Form Submitted")}
              isDarkMode={isDarkMode}
            />
          )}
        </Card>
      </div>
    </div>
  );
};

export default CreateCourseLayout;
