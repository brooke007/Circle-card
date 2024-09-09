import Link from 'next/link'

interface CardShowProps {
  cards: Array<{ customDomain: string; account: string }>
  currentUser: string
}

export default function CardShow({ cards, currentUser }: CardShowProps) {
  return (
    <div className="space-y-4">
      {cards.map((card, index) => (
        <Link
          key={index}
          href={`/${currentUser}/cardholder/${card.customDomain}`}
          className="block p-4 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          <h2 className="font-semibold">{card.account}</h2>
          <p className="text-sm text-gray-600">@{card.customDomain}</p>
        </Link>
      ))}
    </div>
  )
}