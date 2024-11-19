import { useEffect, useState } from "react";
import Card from "../../../components/CommonComponents/Card";
import {
  FaEnvelope,
  FaPhone,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../../api/axiosConfig";
import { toast } from "sonner";
import { debounce } from "lodash";
import { UserCircle } from "lucide-react";

const StudentManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [studentsPerPage] = useState(10);
  const [state, setState] = useState({
    students: [],
    filteredStudents: [],
  });

  const isDarkMode = useSelector((state) => state.admin.toggleTheme);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axiosInstance("/admin/get-students");
        if (response.status === 200) {
          setState({
            students: response.data.students,
            filteredStudents: response.data.students,
          });
        }
      } catch (error) {
        console.log("Students fetching error Admin side:", error);
      }
    };

    fetchStudents();
  }, []);

  const handleSearch = debounce(async (query) => {
    try {
      if (!query) {
        setState((prevState) => ({
          ...prevState,
          filteredStudents: prevState.students,
        }));
        return;
      }
      const response = await axiosInstance.get(
        `/admin/search-students?query=${query}`
      );
      if (response.status === 200) {
        setState((prevState) => ({
          ...prevState,
          filteredStudents: response.data.students,
        }));
      }
    } catch (error) {
      console.log("Search Students Error: ", error);
      toast.error(error?.response?.data?.message);
    }
  }, 1000);

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    handleSearch(value);
  };

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents =
    Array.isArray(state.filteredStudents) && state.filteredStudents.length > 0
      ? state.filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent)
      : [];
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleStudentStatus = async (studentId) => {
    try {
      const response = await axiosInstance.post(
        "/admin/toggle-student-status",
        { studentId }
      );
      if (response.status === 200) {
        setState((prevState) => ({
          ...prevState,
          students: prevState.students.map((student) =>
            student.user_id === studentId
              ? { ...student, is_blocked: !student.is_blocked }
              : student
          ),
          filteredStudents: prevState.filteredStudents.map((student) =>
            student.user_id === studentId
              ? { ...student, is_blocked: !student.is_blocked }
              : student
          ),
        }));
        toast.success(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log("Toggle Student Status Error: ", error);
    }
  };


  const secondaryColor = isDarkMode
    ? "bg-gray-700 hover:bg-gray-600"
    : "bg-gray-200 hover:bg-gray-300";

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Student Management</h1>
        <Card
          className={`${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } p-6`}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search students..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              className={`w-full p-3 rounded-md ${
                isDarkMode
                  ? "bg-gray-700 text-white placeholder-gray-400"
                  : "bg-gray-200 text-gray-800 placeholder-gray-500"
              }`}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr
                  className={`${
                    isDarkMode ? "bg-gray-700" : "bg-gray-200"
                  }`}>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Phone Verified
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Last Active
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentStudents.map((student) => (
                  <tr
                    key={student.user_id}
                    className={isDarkMode ? "bg-gray-800" : "bg-white"}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {student.avatar ? 
                          <img
                            className="h-10 w-10 rounded-full"
                            src={student.avatar}
                            alt=""
                          /> : (
                            <UserCircle className="w-full h-auto" />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium">
                            {student.full_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {student?.user_id || "UID Not Found"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaEnvelope className="mr-2" />
                        <span>{student.email}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaPhone className="mr-2" />
                        <span
                          className={
                            student.phoneVerified
                              ? "text-green-500"
                              : "text-red-500"
                          }>
                          {student.phoneVerified
                            ? "Verified"
                            : "Not Verified"}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {student.last_login || "Inactive"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleStudentStatus(student.user_id)}
                        className={`px-4 py-2 rounded-md flex items-center justify-center w-24 ${
                          !student.is_blocked
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-red-100 text-red-800 hover:bg-red-200"
                        }`}>
                        {!student.is_blocked ? "Block" : "Unblock"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-center items-center">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`mx-1 px-3 py-1 rounded-full flex items-center ${secondaryColor} ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}>
              <FaChevronLeft className="mr-2" /> Prev
            </button>
            {Array.from(
              {
                length: Math.ceil(state.students.length / studentsPerPage),
              },
              (_, i) => {
                if (
                  i === 0 ||
                  i === Math.ceil(state.students.length / studentsPerPage) - 1 ||
                  (i >= currentPage - 2 && i <= currentPage)
                ) {
                  return (
                    <button
                      key={i}
                      onClick={() => paginate(i + 1)}
                      className={`mx-1 px-3 py-1 rounded-full ${
                        currentPage === i + 1
                          ? "bg-blue-600 text-white"
                          : "bg-gray-300"
                      }`}>
                      {i + 1}
                    </button>
                  );
                }
              }
            )}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(state.students.length / studentsPerPage)}
              className={`mx-1 px-3 py-1 rounded-full flex items-center ${secondaryColor} ${
                currentPage === Math.ceil(state.students.length / studentsPerPage)
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}>
              Next <FaChevronRight className="ml-2" />
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentManagement;
