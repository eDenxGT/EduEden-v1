import { useState, useEffect } from "react";
import { debounce } from "lodash";
import CourseCard from "../../CommonComponents/CourseCard";

const CourseListing = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [sortBy, setSortBy] = useState("latest");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Replace this with your actual API call
        const response = await fetch("/api/courses");
        const data = await response.json();
        setCourses(data.courses);
        setFilteredCourses(data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
        // You can add a toast notification here if you have a toast library
      }
    };

    fetchCourses();
  }, []);

  const handleSearch = debounce((query) => {
    const filtered = courses.filter((course) =>
      course.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCourses(filtered);
    setCurrentPage(1);
  }, 300);

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    handleSearch(value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    // Implement sorting logic here
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    // Implement category filtering logic here
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">All Courses</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <button className="text-gray-600 hover:text-gray-800">
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                ></path>
              </svg>
            </button>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
              <img
                src="/placeholder.svg"
                alt="User"
                className="w-8 h-8 rounded-full"
              />
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <input
              type="text"
              placeholder="Search in your courses..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-4">
            <select
              className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="all">All Category</option>
              <option value="development">Development</option>
              <option value="business">Business</option>
              <option value="design">Design</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="4-star">4 Star & Up</option>
              <option value="3-star">3 Star & Up</option>
              <option value="2-star">2 Star & Up</option>
              <option value="1-star">1 Star & Up</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <nav className="inline-flex rounded-md shadow">
            <button className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              Previous
            </button>
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`px-3 py-2 border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === page
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              Next
            </button>
          </nav>
        </div>
      </main>
    </div>
  );
};

export default CourseListing;

