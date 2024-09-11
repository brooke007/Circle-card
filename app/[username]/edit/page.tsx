'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import ProfileEdit from '@/components/profile-edit'
import { getUserUrls, updateUserUrls } from '@/lib/data'

export default function EditProfilePage({ params }: { params: { username: string } }) {
  const [socialLinks, setSocialLinks] = useState([])
  const router = useRouter()

  useEffect(() => {
    const links = getUserUrls(params.username)
    setSocialLinks(links)
  }, [params.username])

  const handleSave = (updatedUrls) => {
    updateUserUrls(params.username, updatedUrls)
    router.push(`/${params.username}`)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Link href={`/${params.username}`} className="inline-flex items-center mb-4 text-blue-500">
        <ArrowLeft size={20} className="mr-2" />
        Back to Profile
      </Link>
      <div className="bg-blue-300 text-white rounded-lg shadow-xl p-8 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
        <ProfileEdit initialUrls={socialLinks} onSave={handleSave} />
      </div>
    </div>
  )
}