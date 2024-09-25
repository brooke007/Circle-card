import Link from "next/link";

interface CardShowProps {
  cards: Array<{ customDomain: string; account: string }>;
}

export default function CardShow({ cards }: CardShowProps) {
  return (
    <div className="space-y-4">
      {cards.map((card, index) => (
        <Link
          key={index}
          href={`/${card.customDomain}`}
          className="block p-4 bg-white rounded border border-gray-300 hover:bg-gray-100 transition"
        >
          <h2 className="font-semibold text-gray-800">{card.account}</h2>
          <p className="text-sm text-gray-600">@{card.customDomain}</p>
        </Link>
      ))}
    </div>
  );
}
