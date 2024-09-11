'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Add from '@/components/add'
import CardShow from '@/components/card-show'
import { getSavedCards, getUserByCustomDomain, addSavedCard } from '@/lib/data'

export default function CardHolderPage({ params }: { params: { username: string } }) {
  const [savedCards, setSavedCards] = useState(getSavedCards(params.username).map(customDomain => ({
    customDomain,
    account: getUserByCustomDomain(customDomain)?.account || 'Unknown User'
  })))

  const handleAddCard = (newCard: string) => {
    if (newCard && !savedCards.some(card => card.customDomain === newCard)) {
      addSavedCard(params.username, newCard)
      const newCardUser = getUserByCustomDomain(newCard)
      setSavedCards([...savedCards, { 
        customDomain: newCard, 
        account: newCardUser ? newCardUser.account : 'Unknown User'
      }])
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Link href={`/${params.username}`} className="inline-flex items-center mb-4 text-blue-500">
        <ArrowLeft size={20} className="mr-2" />
        Back to Profile
      </Link>
      <div className="bg-green-400 rounded-lg shadow-xl p-8 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-white">Card Holder</h1>
        <Add
          onAdd={handleAddCard}
          placeholder="Enter custom domain"
          buttonText="Add Card"
        />
        <div className="mt-6 ">
          <CardShow cards={savedCards} currentUser={params.username} />
        </div>
      </div>
    </div>
  )
}