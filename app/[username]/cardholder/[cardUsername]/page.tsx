'use client'

// import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getUserByCustomDomain, getUserUrls } from '@/lib/data'
import ProfileShow from '@/components/profile-show'
// import FloatingActionButtons from '@/components/floating-action-buttons'

export default function CardHolderPage({ params }: { params: { username: string; cardUsername: string } }) {
  const cardUser = getUserByCustomDomain(params.cardUsername)
  
  if (!cardUser) {
    return <div>User not found</div>
  }

  const socialLinks = getUserUrls(cardUser.customDomain)

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center relative p-4">
      <Link href={`/${params.username}/cardholder`} className="self-start inline-flex items-center mb-4 text-blue-500">
        <ArrowLeft size={20} className="mr-2" />
        Back to Card Holder
      </Link>
      <ProfileShow urls={socialLinks} username={cardUser.customDomain} />
      <div className="h-24" /> {/* Spacer for floating buttons */}
      <div className="fixed bottom-0 left-0 right-0 z-50 pb-6">
        {/* <FloatingActionButtons username={params.username} /> */}
      </div>
    </div>
  )
}