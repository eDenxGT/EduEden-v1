/* eslint-disable react/prop-types */
import { MoreVertical, Star, User } from "lucide-react";

const CourseCard = ({ course }) => (
   <div className="flex flex-col bg-white rounded-none overflow-hidden">
     <div className="relative h-48">
       <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
     </div>
     <div className="p-4 flex flex-col flex-grow">
       <div className="text-xs font-medium text-blue-600 uppercase mb-2">{course.category}</div>
       <h3 className="text-sm font-medium leading-snug mb-2 flex-grow">{course.title}</h3>
       <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
         <div className="flex items-center">
           <Star className="w-3 h-3 text-yellow-400 fill-current" />
           <span className="ml-1">{course.rating}</span>
         </div>
         <div className="flex items-center ml-4">
           <User className="w-3 h-3" />
           <span className="ml-1">{course.students.toLocaleString()} students</span>
         </div>
       </div>
       <div className="flex items-center justify-between">
         <div className="text-lg font-bold">${course.price}</div>
         <button className="text-gray-400 hover:text-gray-600">
           <MoreVertical className="w-4 h-4" />
         </button>
       </div>
     </div>
   </div>
 )

 export default CourseCard;