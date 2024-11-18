import { useEffect, useState } from "react";
import Card from "../../../components/CommonComponents/Card";
import {
	FaEnvelope,
	FaPhone,
	FaCheck,
	FaBan,
	FaChevronLeft,
	FaChevronRight,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../../api/axiosConfig";
import { toast } from "sonner";
import { debounce } from "lodash";


const TutorManagement = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState("");
	const [tutorsPerPage] = useState(10);
  const [state, setState] = useState({
    tutors: [],
    filteredTutors: [],
  });

	const isDarkMode = useSelector((state) => state.admin.toggleTheme);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axiosInstance("/admin/get-tutors");
        if (response.status === 200) {
          setState({
            tutors: response.data.tutors,
            filteredTutors: response.data.tutors,
          });
        }
      } catch (error) {
        console.log("Tutors fetching error Admin side:", error);
      }
    };
  
    fetchTutors();
  }, []);

  const handleSearch = debounce(async (query) => {
    try {
      if (!query) {
        setState((prevState) => ({
          ...prevState,
          filteredTutors: prevState.tutors,
        }));
        return;
      }
      const response = await axiosInstance.get(
        `/admin/search-tutors?query=${query}`
      );
      if (response.status === 200) {
        setState((prevState) => ({
          ...prevState,
          filteredTutors: response.data.tutors,
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

	const indexOfLastTutor = currentPage * tutorsPerPage;
	const indexOfFirstTutor = indexOfLastTutor - tutorsPerPage;
	const currentTutors =
		Array.isArray(state.filteredTutors) && state.filteredTutors.length > 0
			? state.filteredTutors.slice(indexOfFirstTutor, indexOfLastTutor)
			: [];
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleTutorStatus = async (tutorId) => {
    try {
      const response = await axiosInstance.post(
        "/admin/toggle-tutor-status",
        { tutorId }
      );
      if (response.status === 200) {
        setState((prevState) => ({
          ...prevState,
          tutors: prevState.tutors.map((tutor) =>
            tutor.user_id === tutorId
              ? { ...tutor, is_blocked: !tutor.is_blocked }
              : tutor
          ),
          filteredTutors: prevState.filteredTutors.map((tutor) =>
            tutor.user_id === tutorId
              ? { ...tutor, is_blocked: !tutor.is_blocked }
              : tutor
          ),
        }));
        toast.success(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log("Toggle Tutor Status Error: ", error);
    }
  };

	const primaryColor = isDarkMode
		? "bg-blue-600 hover:bg-blue-700"
		: "bg-orange-500 hover:bg-orange-600";
	const secondaryColor = isDarkMode
		? "bg-gray-700 hover:bg-gray-600"
		: "bg-gray-200 hover:bg-gray-300";

	return (
		<div
			className={`min-h-screen ${
				isDarkMode
					? "bg-gray-900 text-white"
					: "bg-gray-100 text-gray-800"
			}`}>
			<div className="container mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold mb-6">Tutor Management</h1>
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
										isDarkMode
											? "bg-gray-700"
											: "bg-gray-200"
									}`}>
									<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
										Tutor
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
              {console.log("RERENDERS")}
								{currentTutors.map((tutor) => (
									<tr
										key={tutor.user_id}
										className={
											isDarkMode
												? "bg-gray-800"
												: "bg-white"
										}>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center">
												<div className="flex-shrink-0 h-10 w-10">
													<img
														className="h-10 w-10 rounded-full"
														src={tutor.avatar}
														alt=""
													/>
												</div>
												<div className="ml-4">
													<div className="text-sm font-medium">
														{tutor.full_name}
													</div>
													<div className="text-sm text-gray-500">
														ID:{" "}
														{tutor?.user_id ||
															"UID Not Found"}
													</div>
												</div>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center">
												<FaEnvelope className="mr-2" />
												<span>{tutor.email}</span>
											</div>
										</td>

										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center">
												<FaPhone className="mr-2" />
												<span
													className={
														tutor.phoneVerified
															? "text-green-500"
															: "text-red-500"
													}>
													{tutor.phoneVerified
														? "Verified"
														: "Not Verified"}
												</span>
											</div>
										</td>

										<td className="px-6 py-4 whitespace-nowrap">
											{tutor.last_login || "Inactive"}
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<button
												onClick={() =>
													toggleTutorStatus(
														tutor.user_id
													)
												}
												className={`px-4 py-2 rounded-md flex items-center justify-center w-24 ${
													!tutor.is_blocked
														? "bg-green-100 text-green-800 hover:bg-green-200"
														: "bg-red-100 text-red-800 hover:bg-red-200"
												}`}>
												{!tutor.is_blocked ? (
													<FaBan className="mr-2" />
												) : (
													<FaCheck className="mr-2" />
												)}
												{!tutor.is_blocked
													? "Block"
													: "Unblock"}
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
								currentPage === 1
									? "opacity-50 cursor-not-allowed"
									: ""
							}`}>
							<FaChevronLeft className="mr-2" /> Prev
						</button>
						{Array.from(
							{
								length: Math.ceil(
									state.tutors.length / tutorsPerPage
								),
							},
							(_, i) => {
								if (
									i === 0 ||
									i ===
										Math.ceil(
											state.tutors.length / tutorsPerPage
										) -
											1 ||
									(i >= currentPage - 2 && i <= currentPage)
								) {
									return (
										<button
											key={i}
											onClick={() => paginate(i + 1)}
											className={`mx-1 w-8 h-8 rounded-full flex items-center justify-center ${
												currentPage === i + 1
													? primaryColor +
													  " text-white"
													: secondaryColor +
													  (isDarkMode
															? " text-white"
															: " text-gray-800")
											}`}>
											{i + 1}
										</button>
									);
								} else if (
									i === currentPage - 3 ||
									i === currentPage + 1
								) {
									return (
										<span key={i} className="mx-1">
											...
										</span>
									);
								}
								return null;
							}
						)}
						<button
							onClick={() => paginate(currentPage + 1)}
							disabled={
								currentPage ===
								Math.ceil(state.tutors.length / tutorsPerPage)
							}
							className={`mx-1 px-3 py-1 rounded-full flex items-center ${secondaryColor} ${
								currentPage ===
								Math.ceil(state.tutors.length / tutorsPerPage)
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

export default TutorManagement;
