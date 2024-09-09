'use client'

import { useState } from 'react'
import { updateCustomDomain } from '@/lib/data'

interface SetCustomDomainProps {
  account: string
  onDomainSet: (domain: string) => void
}

export default function SetCustomDomain({ account, onDomainSet }: SetCustomDomainProps) {
  const [customDomain, setCustomDomain] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (updateCustomDomain(account, customDomain)) {
      onDomainSet(customDomain)
    } else {
      setError('Failed to update custom domain')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <input
        type="text"
        value={customDomain}
        onChange={(e) => setCustomDomain(e.target.value)}
        placeholder="Enter custom domain"
        className="w-64 p-2 border rounded mb-4"
        required
      />
      <button type="submit" className="bg-green-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition-colors">
        Set Custom Domain
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  )
}