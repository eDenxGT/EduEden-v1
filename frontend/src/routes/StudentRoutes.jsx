import React from 'react'

const StudentRoutes = () => {
  return (
    <>		<Router>
    <Routes>
    <Route path="/signup" element={<SignUp />} />
    <Route path="/signin" element={<Signin />} />

       <Route path="/home" element={<StudentHomePage />} />
    </Routes>
 </Router></>
  )
}

export default StudentRoutes