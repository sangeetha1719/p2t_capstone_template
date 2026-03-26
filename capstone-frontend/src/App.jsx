// import React from 'react'
// import { Route, Routes } from 'react-router'
// import Navbar from './components/Navbar'
// import Footer from './components/Footer'
// import Home from './pages/Home'
// import NotFound from './pages/NotFound'
// import About from './pages/About'
// import Login from './pages/Login'
// import Signup from './pages/Signup'

// const App = () => {
//   return (
//     <section className='app'>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         {/* Create your new routes in your application and place them below this comment */}
//         <Route path="/about" element={<About />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         {/* Create your new routes in your application and place them above this comment */}
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//       <Footer />
//     </section>
//   )
// }

// export default App
import React from 'react'
import { Route, Routes } from 'react-router'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Cart from './pages/Cart'
import UploadForm from './components/UploadForm'
import AdminDashboard from './pages/AdminDashboard'

const App = () => {
  return (
    <section className='app min-h-screen flex flex-col'>
      <Navbar />
      <div className="flex-1">
      <Routes>
        {/* Home page  */}
        <Route path="/" element={<Home />} />   
        <Route path="/cart" element={<Cart />} />
        <Route path="/upload" element={<UploadForm onUploadSuccess={(data) => console.log(data)} />} />
           {/* Auth routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        
         {/* 404 error page - catch all route  */} 
        <Route path="*" element={<NotFound />} />
      </Routes>
      </div>
      <Footer />
    </section>
  )
}

export default App
