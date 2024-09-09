'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Share2 } from 'lucide-react'
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
        <div className="flex flex-col items-center">
          <Image
            src="/placeholder.svg?height=100&width=100"
            alt={user.account}
            width={100}
            height={100}
            className="rounded-full"
          />
          <h1 className="mt-4 text-2xl font-bold">{user.account}</h1>
          <p className="text-gray-500">@{user.customDomain}</p>
        </div>
        <div className="mt-6 space-y-4">
          {socialLinks.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              className="block w-full text-center py-2 px-4 bg-gray-200 rounded hover:bg-gray-300 transition"
            >
              {link.platform}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}