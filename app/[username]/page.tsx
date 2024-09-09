import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import FloatingActionButtons from '@/components/floating-action-buttons'
import { getUserByCustomDomain, getUserUrls } from '@/lib/data'

export default function ProfilePage({ params }: { params: { username: string } }) {
  const user = getUserByCustomDomain(params.username)
  
  if (!user) {
    notFound()
  }

  const socialLinks = getUserUrls(user.customDomain)

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
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
      <FloatingActionButtons username={user.customDomain} />
    </div>
  )
}