import Image from 'next/image'

interface BaseinfoShowProps {
  account: string
  customDomain: string
  avatarUrl: string
}

export default function BaseinfoShow({ account, customDomain, avatarUrl }: BaseinfoShowProps) {
  return (
    <div className="flex flex-col items-center">
      <Image
        src={avatarUrl}
        alt={account}
        width={100}
        height={100}
        className="rounded-full"
      />
      <h1 className="mt-4 text-2xl font-bold">{account}</h1>
      <p className="text-gray-500">@{customDomain}</p>
    </div>
  )
}