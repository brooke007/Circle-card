'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import ProfileEdit from '@/components/profile-edit'

export default function EditProfilePage({ params }: { params: { username: string } }) {
  const [socialLinks, setSocialLinks] = useState([])
  const router = useRouter()

  useEffect(() => {
    async function fetchUrls() {
      const response = await fetch(`/api/user?customDomain=${params.username}`);
      if (response.ok) {
        const links = await response.json();
        setSocialLinks(links);
      }
    }
    fetchUrls();
  }, [params.username])

  const handleSave = async (updatedUrls: any) => {
    const response = await fetch('/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'updateUrls', customDomain: params.username, urls: updatedUrls }),
    });
    if (response.ok) {
      router.push(`/${params.username}`)
    }
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