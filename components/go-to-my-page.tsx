import Link from 'next/link'

interface GoToMyPageProps {
  customDomain: string
}

export default function GoToMyPage({ customDomain }: GoToMyPageProps) {
  return (
    <Link href={`/${customDomain}`} className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors">
      Go to My Page
    </Link>
  )
}