'use client'

import { useState } from 'react'
import { findUser } from '@/lib/data'

interface LoginModalProps {
  onClose: () => void
  onLogin: (user: any) => void
}

export default function LoginModal({ onClose, onLogin }: LoginModalProps) {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const user = findUser(account, password)
    if (user) {
      onLogin(user)
    } else {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
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
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mb-2">
            Login
          </button>
          <button onClick={onClose} className="w-full bg-gray-300 text-gray-800 p-2 rounded">
            Cancel
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  )
}