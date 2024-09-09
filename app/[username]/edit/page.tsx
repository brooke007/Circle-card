'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { getUserUrls, updateUserUrls } from '@/lib/data'

export default function EditProfilePage({ params }: { params: { username: string } }) {
  const [socialLinks, setSocialLinks] = useState([])
  const router = useRouter()

  useEffect(() => {
    const links = getUserUrls(params.username)
    setSocialLinks(links)
  }, [params.username])

  const handleAddLink = () => {
    setSocialLinks(prev => [...prev, { platform: '', url: '' }])
  }

  const handleLinkChange = (index: number, field: 'platform' | 'url', value: string) => {
    setSocialLinks(prev => prev.map((link, i) => 
      i === index ? { ...link, [field]: value } : link
    ))
  }

  const handleSave = () => {
    updateUserUrls(params.username, socialLinks)
    router.push(`/${params.username}`)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Link href={`/${params.username}`} className="inline-flex items-center mb-4 text-blue-500">
        <ArrowLeft size={20} className="mr-2" />
        Back to Profile
      </Link>
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Social Links</label>
            {socialLinks.map((link, index) => (
              <div key={index} className="flex gap-2 mt-2">
                <input
                  type="text"
                  placeholder="Platform"
                  value={link.platform}
                  onChange={(e) => handleLinkChange(index, 'platform', e.target.value)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <input
                  type="text"
                  placeholder="URL"
                  value={link.url}
                  onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
            ))}
            <button
              onClick={handleAddLink}
              className="mt-2 text-sm text-blue-500 hover:text-blue-600"
            >
              + Add Link
            </button>
          </div>
        </div>
        <button
          onClick={handleSave}
          className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}