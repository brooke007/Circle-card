import Link from 'next/link'

interface EditMyProfileProps {
  username: string
}

export default function EditMyProfile({ username }: EditMyProfileProps) {
  return (
    <Link href={`/${username}/edit`} className="bg-green-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition-colors">
      Edit My Profile
    </Link>
  )
}