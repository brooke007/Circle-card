'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Share2 } from 'lucide-react'
import BaseinfoShow from '@/components/baseinfo-show'
import ProfileShow from '@/components/profile-show'
import { getUserByCustomDomain, getUserUrls } from '@/lib/data'

export default function CardView({ params }: { params: { username: string, cardUsername: string } }) {
  const [copied, setCopied] = useState(false)
  const user = getUserByCustomDomain(params.cardUsername)
  const socialLinks = getUserUrls(params.cardUsername)

  if (!user) {
    return <div>User not found</div>
  }

  const handleShare = () => {
    const url = `${window.location.origin}/${params.cardUsername}`
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex justify-between items-center mb-4">
        <Link href={`/${params.username}/cardholder`} className="inline-flex items-center text-blue-500">
          <ArrowLeft size={20} className="mr-2" />
          Back to Card Holder
        </Link>
        <button
          onClick={handleShare}
          className="bg-blue-500 text-white p-2 rounded flex items-center"
        >
          <Share2 size={20} />
          <span className="ml-2">{copied ? 'Copied!' : 'Share'}</span>
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md mx-auto">
        <BaseinfoShow
          account={user.account}
          customDomain={user.customDomain}
          avatarUrl={user.avatarUrl}
        />
        <ProfileShow urls={socialLinks} />
      </div>
    </div>
  )
}