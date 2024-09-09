import Link from 'next/link'

interface ProfileShowProps {
  urls: Array<{ platform: string; url: string }>
}

export default function ProfileShow({ urls }: ProfileShowProps) {
  return (
    <div className="mt-6 space-y-4">
      {urls.map((link, index) => (
        <Link
          key={index}
          href={link.url}
          className="block w-full text-center py-2 px-4 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          {link.platform}
        </Link>
      ))}
    </div>
  )
}