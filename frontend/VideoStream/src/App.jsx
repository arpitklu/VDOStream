import { Route, Routes } from 'react-router'
import CallPage from "./pages/CallPage.jsx"
import SignupPage from "./pages/SignupPage.jsx"
import ChatPage from "./pages/ChatPage.jsx"
import HomePage from "./pages/HomePage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import NotificationsPage from "./pages/NotificationsPage.jsx"
import OnboardingPage from "./pages/OnboardingPage.jsx"

import toast, { Toaster } from "react-hot-toast"


const App = () => {
  return (
    <div className='h-screen' data-theme="night">
      <button onClick={() => toast.error("Hellow World !!")}>Create a Toast</button>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/signup' element={<SignupPage />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/notifications' element={<NotificationsPage />}/>
        <Route path='/call' element={<CallPage />}/>
        <Route path='/chat' element={<ChatPage />}/>
        <Route path='/home' element={<HomePage />}/>
        <Route path='/onboarding' element={<OnboardingPage />}/>
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
