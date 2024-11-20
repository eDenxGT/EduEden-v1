import { useState } from 'react'
import { Search, ChevronDown } from 'lucide-react'
import CourseCard from '../../CommonComponents/CourseCard'


const MyCourses = () => {
  const [courses] = useState([
    {
      id: 1,
      title: "Premiere Pro CC for Beginners: Video Editing in Premiere",
      category: "DEVELOPMENT",
      rating: 4.8,
      students: 382841,
      price: 24.00,
      image: "/placeholder.svg?height=200&width=300"
    },
    {
      id: 2,
      title: "Learn Python Programming Masterclass",
      category: "DEVELOPMENT",
      rating: 4.0,
      students: 511123,
      price: 49.00,
      image: "/placeholder.svg?height=200&width=300"
    },
    {
      id: 3,
      title: "Data Structures & Algorithms Essentials (2023)",
      category: "BEGINNERS",
      rating: 5.0,
      students: 397837,
      price: 23.00,
      image: "/placeholder.svg?height=200&width=300"
    },
    {
      id: 4,
      title: "AI & 7+ Hands-On Machine Science",
      category: "BEGINNING",
      rating: 4.7,
      students: 271414,
      price: 89.00,
      image: "/placeholder.svg?height=200&width=300"
    }
  ])

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold">My Courses</h1>

        </div>

        <div className="flex items-center justify-between  gap-4 mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search in your courses..."
              className="pl-4 pr-4 py-2  rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              Sort By
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              All Category
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              4 Star & Up
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        <div className="flex items-center justify-center mt-8 gap-2">
          {[1, 2, 3, 4, 5].map(page => (
            <button
              key={page}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                page === 2 ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyCourses