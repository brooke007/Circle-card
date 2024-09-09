'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Plus } from 'lucide-react'
import { getSavedCards, getUserByCustomDomain, addSavedCard } from '@/lib/data'

export default function CardHolderPage({ params }: { params: { username: string } }) {
  const [savedCards, setSavedCards] = useState(getSavedCards(params.username))
  const [newCard, setNewCard] = useState('')

  const handleAddCard = () => {
    if (newCard && !savedCards.includes(newCard)) {
      addSavedCard(params.username, newCard)
      setSavedCards([...savedCards, newCard])
      setNewCard('')
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Link href={`/${params.username}`} className="inline-flex items-center mb-4 text-blue-500">
        <ArrowLeft size={20} className="mr-2" />
        Back to Profile
      </Link>
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Card Holder</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={newCard}
            onChange={(e) => setNewCard(e.target.value)}
            placeholder="Enter custom domain"
            className="flex-grow p-2 border rounded-l"
          />
          <button
            onClick={handleAddCard}
            className="bg-blue-500 text-white p-2 rounded-r flex items-center"
          >
            <Plus size={20} />
            <span className="ml-2">Add Card</span>
          </button>
        </div>
        <div className="space-y-4">
          {savedCards.map((card, index) => {
            const user = getUserByCustomDomain(card)
            return (
              <Link
                key={index}
                href={`/${params.username}/cardholder/${card}`}
                className="block p-4 bg-gray-200 rounded hover:bg-gray-300 transition"
              >
                <h2 className="font-semibold">{user ? user.account : 'Unknown User'}</h2>
                <p className="text-sm text-gray-600">@{card}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}