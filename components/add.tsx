import { useState } from 'react'

interface AddProps {
  onAdd: (value: string) => void
  placeholder: string
  buttonText: string
}

export default function Add({ onAdd, placeholder, buttonText }: AddProps) {
  const [value, setValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim()) {
      onAdd(value.trim())
      setValue('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="flex-grow p-2 border rounded-full"
      />
      <button 
        type="submit" 
        className="w-12 h-12 bg-pizzapurple text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    </form>
  )
}