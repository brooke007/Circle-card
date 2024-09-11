import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function Web3Page({ params }: { params: { username: string } }) {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Link href={`/${params.username}`} className="inline-flex items-center mb-4 text-blue-500">
        <ArrowLeft size={20} className="mr-2" />
        Back to Profile
      </Link>
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Web3</h1>
        <p>Web3 functionality coming soon...</p>
      </div>
    </div>
  )
}