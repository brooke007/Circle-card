'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import LoginModal from '@/components/login-modal'
import RegisterModal from '@/components/register-modal'
import GoToMyPage from '@/components/go-to-my-page'
import EditMyProfile from '@/components/edit-my-profile'
import SetCustomDomain from '@/components/set-custom-domain'
import { getUserUrls } from '@/lib/data'
import './globals.css'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [user, setUser] = useState(null)

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser)
    setShowLoginModal(false)
  }

  const handleRegister = (newUser) => {
    setUser(newUser)
    setShowRegisterModal(false)
  }

  const handleDomainSet = (domain) => {
    setUser({ ...user, customDomain: domain })
  }

  const userHasUrls = user && user.customDomain && getUserUrls(user.customDomain).length > 0

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center relative">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md"
      >
        <Menu size={24} />
      </button>
      {isMenuOpen && (
        <div className="absolute top-16 right-4 bg-white shadow-md rounded-md p-4">
          <button onClick={() => setShowLoginModal(true)} className="block w-full text-left py-2 px-4 hover:bg-gray-100">
            Login
          </button>
          <button onClick={() => setShowRegisterModal(true)} className="block w-full text-left py-2 px-4 hover:bg-gray-100">
            Register
          </button>
        </div>
      )}
      <div>
        <img src="/pizza00.png" className="mx-auto my-8 w-full max-w-80" alt="Pizza" />
        <h1 className="text-2xl font-bold text-pizzapurple ml-8 mr-8">Get Your Pizza Card Here!</h1>
      </div>
      
      {user ? (
        user.customDomain ? (
          userHasUrls ? (
            <GoToMyPage customDomain={user.customDomain} />
          ) : (
            <EditMyProfile username={user.customDomain} />
          )
        ) : (
          <SetCustomDomain account={user.account} onDomainSet={handleDomainSet} />
        )
      ) : (
        <p className="text-xxl text-yellow-300">Login or register to create your Pizza Card</p>
      )}
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} onLogin={handleLogin} />
      )}
      {showRegisterModal && (
        <RegisterModal onClose={() => setShowRegisterModal(false)} onRegister={handleRegister} />
      )}
    </div>
  )
}