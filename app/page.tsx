'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { findUser, createUser, updateCustomDomain } from '@/lib/data'

export default function Home() {
  const [isLogin, setIsLogin] = useState(true)
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [customDomain, setCustomDomain] = useState('')
  const [error, setError] = useState('')
  const [user, setUser] = useState(null)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (isLogin) {
      const foundUser = findUser(account, password)
      if (foundUser) {
        setUser(foundUser)
        if (foundUser.customDomain) {
          router.push(`/${foundUser.customDomain}`)
        }
      } else {
        setError('Invalid credentials')
      }
    } else {
      const newUser = createUser(account, password)
      if (newUser) {
        setUser(newUser)
      } else {
        setError('Account already exists')
      }
    }
  }

  const handleCustomDomain = (e: React.FormEvent) => {
    e.preventDefault()
    if (user && updateCustomDomain(user.account, customDomain)) {
      router.push(`/${customDomain}`)
    } else {
      setError('Failed to update custom domain')
    }
  }

  if (user && !user.customDomain) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-4">Set Custom Domain</h1>
          <form onSubmit={handleCustomDomain}>
            <input
              type="text"
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
              placeholder="Enter custom domain"
              className="w-full p-2 border rounded mb-4"
              required
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
              Set Custom Domain
            </button>
          </form>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </div>
    )
  }

  if (user && user.customDomain) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-4">Welcome, {user.account}!</h1>
          <button
            onClick={() => router.push(`/${user.customDomain}`)}
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Go to My Page
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Register'}</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            placeholder="Account"
            className="w-full p-2 border rounded mb-4"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 border rounded mb-4"
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <p className="mt-4 text-center">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 underline"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  )
}