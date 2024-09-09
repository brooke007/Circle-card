import { notFound } from 'next/navigation'
import FloatingActionButtons from '@/components/floating-action-buttons'
import BaseinfoShow from '@/components/baseinfo-show'
import ProfileShow from '@/components/profile-show'
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
        <BaseinfoShow
          account={user.account}
          customDomain={user.customDomain}
          avatarUrl={user.avatarUrl}
        />
        <ProfileShow urls={socialLinks} />
      </div>
      <FloatingActionButtons username={user.customDomain} />
    </div>
  )
}