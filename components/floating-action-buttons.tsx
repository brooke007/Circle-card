import Link from 'next/link'
import { Edit, Users, User } from 'lucide-react'

export default function FloatingActionButtons({ username }: { username: string }) {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2">
      <Link href={`/${username}/edit`} className="p-3 bg-blue-500 text-white rounded-full shadow-lg">
        <Edit size={24} />
      </Link>
      <Link href={`/${username}/cardholder`} className="p-3 bg-green-500 text-white rounded-full shadow-lg">
        <Users size={24} />
      </Link>
      <Link href={`/${username}/system`} className="p-3 bg-purple-500 text-white rounded-full shadow-lg">
        <User size={24} />
      </Link>
    </div>
  )
}