import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Search, Edit, Trash } from "lucide-react";
import {
	fetchCategories,
	deleteCategory,
	searchCategories,
} from "../../../store/slices/categoriesSlice";
import Card from "../../../components/CommonComponents/Card";
import { toast } from "sonner";
import AddCategoryModal from "./AddCategoriesModal";
import { useLoading } from "../../../contexts/LoadingContext";
import { debounce } from "lodash";
import ConfirmationModal from "../../../utils/Modals/ConfirmtionModal";

const Categories = () => {
	const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
		useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const dispatch = useDispatch();
	const { startSpinnerLoading, stopSpinnerLoading } = useLoading();

	const { categories, loading } = useSelector((state) => state.categories);
	const isDarkMode = useSelector((state) => state.admin.toggleTheme);

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);

	const handleSearch = debounce((value) => {
		if (value.trim()) {
			dispatch(searchCategories(value));
		} else {
			dispatch(fetchCategories());
		}
	}, 1000);

	const onSearchChange = (value) => {
		setSearchQuery(value);
		handleSearch(value);
	};

	const handleDelete = async () => {
		try {
			if (!selectedCategory) return;
			startSpinnerLoading();
			await dispatch(deleteCategory(selectedCategory)).unwrap();
			// toast.success("Category deleted successfully!");
			setSelectedCategory(null);
			stopSpinnerLoading();
			setIsConfirmationModalOpen(false);
		} catch (err) {
			toast.error(err.message || "Failed to delete category");
			stopSpinnerLoading();
		}
	};

	const handleDeleteCategoryModal = (id) => {
		setSelectedCategory(id); 
		setIsConfirmationModalOpen(true); 
	};

	const handleConfirmModalClose = () => {
		setIsConfirmationModalOpen(false); 
		setSelectedCategory(null); 
	};

	const handleEdit = (category) => {
		setSelectedCategory(category); 
		setIsModalOpen(true); 
	};

	return (
		<div
			className={`min-h-screen p-6 ${
				isDarkMode
					? "bg-gray-900 text-white"
					: "bg-gray-100 text-gray-800"
			}`}>
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-3xl font-bold">Categories</h1>
					<button
						onClick={() => {
							setSelectedCategory(null);
							setIsModalOpen(true);
						}}
						className="flex items-center px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
						<Plus className="w-5 h-5 mr-2" />
						Add Category
					</button>
				</div>

				{/* Search Bar */}
				<div className="mb-6">
					<div className="relative">
						<input
							type="text"
							placeholder="Search categories..."
							value={searchQuery}
							onChange={(e) => onSearchChange(e.target.value)}
							className={`w-full px-4 py-2 pl-10 rounded-lg ${
								isDarkMode
									? "bg-gray-800 border-gray-700 text-white"
									: "bg-white border-gray-300"
							} border focus:ring-2 focus:ring-orange-500`}
						/>
						<Search
							className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
							size={20}
						/>
					</div>
				</div>

				{/* Categories List */}
				<Card
					className={`${
						isDarkMode ? "bg-gray-800" : "bg-white"
					} shadow-lg rounded-lg overflow-hidden`}>
					{loading ? (
						<div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-30">
							<div className="p-4 flex items-center space-x-4">
								<div className="w-16 h-16 border-4 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
							</div>
						</div>
					) : categories.length === 0 ? (
						<div className="p-6 text-center">
							No categories found
						</div>
					) : (
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead>
									<tr
										className={`${
											isDarkMode
												? "bg-gray-700"
												: "bg-gray-50"
										}`}>
										<th className="px-6 py-3 text-left">
											Name
										</th>
										<th className="px-6 py-3 text-left">
											Description
										</th>
										<th className="px-6 py-3 text-left">
											Actions
										</th>
									</tr>
								</thead>
								<tbody>
									{categories.map((category) => (
										<tr
											key={category._id}
											className={`border-b ${
												isDarkMode
													? "border-gray-700 hover:bg-gray-700"
													: "border-gray-200 hover:bg-gray-50"
											}`}>
											<td className="px-6 py-4">
												{category.title}
											</td>
											<td className="px-6 py-4">
												{category.description}
											</td>

											<td className="px-6 py-4">
												<div className="flex space-x-2">
													<button
														onClick={() =>
															handleEdit(category)
														}
														className="text-blue-500 hover:text-blue-700">
														<Edit size={18} />
													</button>
													<button
														onClick={() =>
															handleDeleteCategoryModal(
																category._id
															)
														}
														className="text-red-500 hover:text-red-700">
														<Trash size={18} />
													</button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</Card>
			</div>

			{/* Add/Edit Category Modal */}
			{isModalOpen && (
				<AddCategoryModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					category={selectedCategory}
					isDarkMode={isDarkMode}
				/>
			)}

			{/* Delete Confirmation Modal */}
			{isConfirmationModalOpen && (
				<ConfirmationModal
					isDarkMode={isDarkMode}
					isOpen={isConfirmationModalOpen}
					onClose={handleConfirmModalClose}
					onConfirm={handleDelete}
					title="Delete Category"
					description="Are you sure you want to delete this category?"
					confirmText="Delete"
					cancelText="Cancel"
					icon="danger"
				/>
			)}
		</div>
	);
};

export default Categories;
